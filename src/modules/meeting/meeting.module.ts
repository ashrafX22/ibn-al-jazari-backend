import { Module } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { MeetingController } from './meeting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meeting } from 'src/models/entities/meeting.entity';
import { Classroom } from 'src/models/entities/classroom.entity';
import { MeetingServiceFactory } from './factories/meeting-service.factory';
import { GoogleMeetingService } from './providers/google/google-meeting.service';
import { AuthModule } from '../auth/auth.module';
import { JwtUtilService } from '../auth/jwt/jwt-util.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Meeting, Classroom]),
        AuthModule,
    ],
    controllers: [MeetingController],
    providers: [
        MeetingServiceFactory,
        MeetingService,
        GoogleMeetingService,
        JwtUtilService,
    ],
    exports: [MeetingService]
})
export class MeetingModule { }
