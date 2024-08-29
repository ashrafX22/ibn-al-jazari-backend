import { Module } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { ClassroomController } from './classroom.controller';
import { Classroom } from 'src/models/entities/classroom.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from 'src/models/entities/enrollment.entity';
import { EnrollmentModule } from '../enrollment/enrollment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Classroom, Enrollment]),
    EnrollmentModule,
  ],
  controllers: [ClassroomController],
  providers: [ClassroomService],
  exports: [ClassroomService],
})
export class ClassroomModule {}
