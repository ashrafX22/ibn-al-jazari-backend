import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meeting } from 'src/models/entities/meeting.entity';
import { MeetingServiceFactory } from './factories/meeting-service.factory';
import { Jwt } from '../auth/jwt/jwt.interface';
import { CreateMeetingDetails } from './interfaces/create-meeting-details.interface';
import { MeetingEnity } from './entities/meeting.entity';
import { MeetingProvider } from './enums/meeting-provider.enum';

@Injectable()
export class MeetingService {
  constructor(
    @InjectRepository(Meeting)
    private readonly meetingRepository: Repository<Meeting>,
    private readonly meetingServiceFactory: MeetingServiceFactory,
  ) { }

  async create(
    creatorDetails: Jwt,
    classroomDetails: any,
    createMeetingDto: CreateMeetingDto,
  ): Promise<MeetingEnity> {
    console.log("create meeting service");

    const { provider } = createMeetingDto;

    const meetingDetails: CreateMeetingDetails = {
      title: classroomDetails.name,
      appointments: classroomDetails.appointments,
      attendees: classroomDetails.students,
    };

    console.log("meetingDetails", meetingDetails);

    const meetingService =
      this.meetingServiceFactory.getMeetingService(provider);
    const providerMeeting = await meetingService.createMeeting(
      creatorDetails,
      meetingDetails,
    );
    const { id, link } = meetingService.getProviderMeetingDetails(providerMeeting);

    console.log("meetingLink", link);
    try {
      const meeting = this.meetingRepository.create({
        meetingProviderId: id,
        link,
        classroomId: classroomDetails.id,
      });

      const savedMeeting = await this.meetingRepository.save(meeting);
      console.log("meeting", savedMeeting);
      return new MeetingEnity(savedMeeting);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<MeetingEnity[]> {
    const meetings = await this.meetingRepository.find();
    return meetings.map((meeting) => new MeetingEnity(meeting));
  }

  async findOne(id: string): Promise<MeetingEnity> {
    const meeting = await this.meetingRepository.findOneBy({ id });

    if (!meeting) {
      throw new NotFoundException(`Meeting with ID ${id} not found.`);
    }

    return new MeetingEnity(meeting);
  }

  async remove(id: string): Promise<MeetingEnity> {
    const meeting = await this.findOne(id);

    if (!meeting) {
      throw new NotFoundException(`Meeting with ID ${id} not found.`);
    }

    await this.meetingRepository.delete(meeting);
    return new MeetingEnity(meeting);
  }
  async removeByClassroomId(creatorDetails: Jwt, classroomId: string, meetingProvider: MeetingProvider): Promise<void> {
    const meeting = await this.meetingRepository.findOneBy({ classroomId });

    if (!meeting) {
      console.log(`removeByClassroomId: classroom ${classroomId} has no meeting`);
      return;
    };

    const meetingService = this.meetingServiceFactory.getMeetingService(meetingProvider);
    await meetingService.deleteMeeting(creatorDetails, meeting.meetingProviderId);

    await this.meetingRepository.delete(meeting.id);
  }
}
