import { Module } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { MeetingController } from './meeting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meeting } from 'src/models/entities/meeting.entity';
import { Classroom } from 'src/models/entities/classroom.entity';
import { ClassroomService } from '../classroom/classroom.service';
import { EnrollmentService } from '../enrollment/enrollment.service';

@Module({
    imports: [TypeOrmModule.forFeature([Meeting, Classroom])],
    controllers: [MeetingController],
    providers: [MeetingService, ClassroomService, EnrollmentService],
})
export class MeetingModule { }
