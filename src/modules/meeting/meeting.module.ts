import { Module } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { MeetingController } from './meeting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meeting } from 'src/models/entities/meeting.entity';
import { Classroom } from 'src/models/entities/classroom.entity';
import { ClassroomService } from '../classroom/classroom.service';
import { MeetingServiceFactory } from './factories/meeting-service.factory';
import { GoogleMeetingService } from './providers/google/google-meeting.service';
import { AuthModule } from '../auth/auth.module';
import { EnrollmentModule } from '../enrollment/enrollment.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Meeting, Classroom]),
        AuthModule,
        EnrollmentModule
    ],
    controllers: [MeetingController],
    providers: [
        MeetingServiceFactory,
        MeetingService,
        GoogleMeetingService,
        ClassroomService,
    ],
})
export class MeetingModule { }
