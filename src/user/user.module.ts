import { Module } from '@nestjs/common';
import { Teacher } from '../models/entities/teacher.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { StudentService } from 'src/student/student.service';
import { TeacherService } from 'src/teacher/teacher.service';
import { Student } from 'src/models/entities/student.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Student, Teacher])],
    exports: [UserService],
    controllers: [UserController],
    providers: [UserService, StudentService, TeacherService],
})
export class UserModule { }
