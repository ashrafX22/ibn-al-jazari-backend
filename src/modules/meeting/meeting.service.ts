import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { ClassroomService } from '../classroom/classroom.service';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meeting } from 'src/models/entities/meeting.entity';
import { MeetingServiceFactory } from './factories/meeting-service.factory';
import { Jwt } from '../auth/jwt/jwt.interface';
import { MeetingDetails } from './interfaces/meeting-details.interface';
import { UpdateMeetingDto } from './dto/update-meeting.dto';

@Injectable()
export class MeetingService {
    constructor(
        @InjectRepository(Meeting)
        private readonly meetingRepository: Repository<Meeting>,
        private readonly classroomService: ClassroomService,
        private readonly meetingServiceFactory: MeetingServiceFactory,
        private readonly enrollmentService: EnrollmentService
    ) { }

    async create(creatorDetails: Jwt, classroomId: number, createMeetingDto: CreateMeetingDto) {
        const { startTime, provider } = createMeetingDto;

        const classroom = await this.classroomService.findOne(classroomId);
        if (!classroom) throw new NotFoundException('classroom not found');

        const studentEmails = await this.enrollmentService.getStudentEmailsByClassroomId(classroomId);

        const meetingDetails: MeetingDetails = { title: classroom.name, startTime, attendees: studentEmails };

        const meetingService = this.meetingServiceFactory.getMeetingService(provider);
        const providerMeeting = await meetingService.createMeeting(creatorDetails, meetingDetails);
        const meetingLink = meetingService.getMeetingLink(providerMeeting);

        console.log("MeetingService create");
        console.log("startTime", startTime);
        console.log("classroomId", classroomId);
        console.log("link", meetingLink);
        try {
            const meeting = this.meetingRepository.create({ classroomId, startTime, link: meetingLink });

            await this.meetingRepository.save(meeting);

            return meeting;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async findAll() {
        return await this.meetingRepository.find();
    }

    async findOne(id: number) {
        return await this.meetingRepository.findOneBy({ id });
    }

    async update(id: number, updateMeetingDto: UpdateMeetingDto) {
        const meeting = await this.meetingRepository.findOneBy({ id });

        if (!meeting) return null;

        await this.meetingRepository.update(id, updateMeetingDto);

        return await this.meetingRepository.findOneBy({ id });
    }

    async remove(id: number) {
        const meeting = await this.findOne(id);

        if (!meeting) return null;

        return this.meetingRepository.remove(meeting);
    }
}
