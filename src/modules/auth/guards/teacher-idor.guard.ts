import {
  CanActivate,
  ExecutionContext,
  Injectable,
  MethodNotAllowedException,
} from '@nestjs/common';
import { Role } from 'src/models/enums/role.enum';
import { ClassroomService } from 'src/modules/classroom/classroom.service';

@Injectable()
export class TeacherIdorGuard implements CanActivate {
  constructor(private classroomService: ClassroomService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('TeacherIdorGuard');

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role !== Role.TEACHER) {
      throw new MethodNotAllowedException(
        "can't use this guard when the user is not a teacher",
      );
    }

    const teacherId =
      request.params.teacherId ||
      request.body.teacherId ||
      request.query.teacherId;

    if (teacherId) {
      console.log(`teacher-idor.guard.ts teacherId: `, teacherId);
      return teacherId === user.id;
    }

    const classroomId =
      request.params.classroomId ||
      request.body.classroomId ||
      request.query.classroomId;

    if (classroomId) {
      const teacherId = await this.classroomService.findTeacherId(classroomId);
      console.log(
        `teacher-idor.guard.ts classroomId ${classroomId}'s teacherId: `,
        teacherId,
      );
      return teacherId === user.id;
    }

    return false;
  }
}
