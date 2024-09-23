import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from 'src/models/enums/role.enum';
import { PublicRouteService } from '../public-route/public.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private publicRouteService: PublicRouteService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
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

    const teacherId = +request.params.teacherId;
    if (teacherId && user.role === Role.TEACHER && teacherId !== user.id)
      return false;

    const studentId = +request.params.studentId;
    if (studentId && user.role === Role.STUDENT && studentId !== user.id)
      return false;

    return true;
  }
}
