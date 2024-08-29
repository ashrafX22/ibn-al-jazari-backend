import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { Teacher } from '../../models/entities/teacher.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Classroom } from '../../models/entities/classroom.entity';
import { Meeting } from 'src/models/entities/meeting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher, Classroom, Meeting])],
  exports: [TeacherService], // Make TeacherService accessible to other modules
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
