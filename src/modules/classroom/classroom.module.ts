import { Module } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { ClassroomController } from './classroom.controller';
import { Classroom } from 'src/models/entities/classroom.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from 'src/models/entities/enrollment.entity';
import { EnrollmentModule } from '../enrollment/enrollment.module';
import { MeetingModule } from '../meeting/meeting.module';
import { AppointmentModule } from '../appointment/appointment.module';
import { GoogleTokenInterceptor } from '../auth/providers/google/google-token.interceptor';
import { AuthModule } from '../auth/auth.module';
import { JwtUtilService } from '../auth/jwt/jwt-util.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Classroom, Enrollment]),
    AuthModule,
    EnrollmentModule,
    AppointmentModule,
    MeetingModule,
  ],
  controllers: [ClassroomController],
  providers: [ClassroomService, JwtUtilService],
  exports: [ClassroomService],
})
export class ClassroomModule { }
