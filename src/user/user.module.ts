import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/entities/user.entity';
import { Student } from 'src/models/entities/student.entity';
import { Teacher } from 'src/models/entities/teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Student, Teacher])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
