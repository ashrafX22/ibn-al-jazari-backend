import {
  CanActivate,
  ExecutionContext,
  Injectable,
  MethodNotAllowedException,
} from '@nestjs/common';
import { Role } from 'src/models/enums/role.enum';
import { EnrollmentService } from 'src/modules/enrollment/enrollment.service';

@Injectable()
export class StudentIdorGuard implements CanActivate {
  constructor(private enrollmentService: EnrollmentService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('StudentIdorGuard');

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role !== Role.STUDENT) {
      throw new MethodNotAllowedException(
        "can't use this guard when the user is not a student",
      );
    }

    const studentId =
      request.params.studentId ||
      request.body.studentId ||
      request.query.studentId;

    if (studentId) {
      console.log(`student-idor.guard.ts studentId: `, studentId);
      return studentId === user.id;
    }

    const classroomId =
      request.params.classroomId ||
      request.body.classroomId ||
      request.query.classroomId;

    if (classroomId) {
      const enrollment = await this.enrollmentService.findOne(
        classroomId,
        user.id,
      );
      console.log(`student-idor.guard.ts enrollment: `, enrollment);
      return !!enrollment;
    }

    return false;
  }
}
