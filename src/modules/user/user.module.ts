import { Module } from '@nestjs/common';
import { Teacher } from '../../models/entities/teacher.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { StudentService } from 'src/modules/student/student.service';
import { TeacherService } from 'src/modules/teacher/teacher.service';
import { Student } from 'src/models/entities/student.entity';
import { Classroom } from 'src/models/entities/classroom.entity';
import { Subject } from 'src/models/entities/subject.entity';
import { Meeting } from 'src/models/entities/meeting.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Teacher, Classroom, Subject, Meeting]),
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService, StudentService, TeacherService],
})
export class UserModule {}
