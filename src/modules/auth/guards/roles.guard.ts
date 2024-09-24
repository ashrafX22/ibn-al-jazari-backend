import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from 'src/models/enums/role.enum';
import { PublicRouteService } from '../public-route/public.service';
import { ClassroomService } from 'src/modules/classroom/classroom.service';
import { EnrollmentService } from 'src/modules/enrollment/enrollment.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private publicRouteService: PublicRouteService,
    private classroomService: ClassroomService,
    private enrollmentService: EnrollmentService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('RolesGuard');
    // If the route is public, bypass the guard
    if (this.publicRouteService.isPublicRoute(context)) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role === Role.ADMIN) return true;

    // get roles specified using @Roles()
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('required roles', requiredRoles);

    if (!requiredRoles.includes(user.role)) return false;

    const teacherId = request.params.teacherId;
    if (teacherId && user.role === Role.TEACHER) return teacherId === user.id;

    const studentId = request.params.studentId;
    if (studentId && user.role === Role.STUDENT) return studentId === user.id;

    const classroomId = request.params.classroomId;
    if (classroomId) {
      if (user.role === Role.TEACHER) {
        const teacherId =
          await this.classroomService.findTeacherId(classroomId);
        return teacherId === user.id;
      } else if (user.role === Role.STUDENT) {
        const studentId = request.params.studentId;
        if (studentId) return studentId === user.id;
        else {
          const enrollment = await this.enrollmentService.findOne(
            classroomId,
            user.id,
          );
          return !!enrollment;
        }
      }
    }

    return false;
  }
}
