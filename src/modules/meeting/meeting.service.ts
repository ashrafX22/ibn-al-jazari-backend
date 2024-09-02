import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { ClassroomService } from '../classroom/classroom.service';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Meeting } from 'src/models/entities/meeting.entity';
import { MeetingServiceFactory } from './factories/meeting-service.factory';
import { Jwt } from '../auth/jwt/jwt.interface';
import { MeetingDetails } from './interfaces/meeting-details.interface';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { AppointmentService } from '../appointment/appointment.service';
import { MeetingEnity } from './entities/meeting.entity';

@Injectable()
export class MeetingService {
  constructor(
    @InjectRepository(Meeting)
    private readonly meetingRepository: Repository<Meeting>,
    private readonly classroomService: ClassroomService,
    private readonly meetingServiceFactory: MeetingServiceFactory,
    private readonly appointmentService: AppointmentService,
    private readonly enrollmentService: EnrollmentService,
  ) { }

  async create(
    creatorDetails: Jwt,
    classroomId: number,
    createMeetingDto: CreateMeetingDto,
  ): Promise<MeetingEnity> {
    const { provider } = createMeetingDto;

    const classroom = await this.classroomService.findOne(classroomId);
    if (!classroom) throw new NotFoundException('Classroom not found');

    const classroomAppointments =
      await this.appointmentService.findAppointmentsByClassroomId(classroomId);

    const studentEmails =
      await this.enrollmentService.findStudentEmailsByClassroomId(classroomId);

    const meetingDetails: MeetingDetails = {
      title: classroom.name,
      appointments: classroomAppointments,
      attendees: studentEmails,
    };

    const meetingService =
      this.meetingServiceFactory.getMeetingService(provider);
    const providerMeeting = await meetingService.createMeeting(
      creatorDetails,
      meetingDetails,
    );
    const meetingLink = meetingService.getMeetingLink(providerMeeting);

    try {
      const meeting = this.meetingRepository.create({
        classroomId,
        link: meetingLink,
      });

      const savedMeeting = await this.meetingRepository.save(meeting);
      return new MeetingEnity(savedMeeting);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<MeetingEnity[]> {
    const meetings = await this.meetingRepository.find();
    return meetings.map((meeting) => new MeetingEnity(meeting));
  }

  async findMeetingsByTeacherId(teacherId: number): Promise<MeetingEnity[]> {
    const classrooms =
      await this.classroomService.findClassroomsByTeacherId(teacherId);

    const classroomIds = classrooms.map((classroom) => classroom.id);

    if (classroomIds.length === 0) {
      return [];
    }

    const meetings = await this.meetingRepository.find({
      where: {
        classroomId: In(classroomIds),
      },
    });

    return meetings.map((meeting) => new MeetingEnity(meeting));
  }

  async findMeetingsByStudentId(studentId: number): Promise<MeetingEnity[]> {
    const classrooms =
      await this.classroomService.findClassroomsByStudentId(studentId);

    const classroomIds = classrooms.map((classroom) => classroom.id);

    if (classroomIds.length === 0) {
      return [];
    }

    const meetings = await this.meetingRepository.find({
      where: {
        classroomId: In(classroomIds),
      },
    });

    return meetings.map((meeting) => new MeetingEnity(meeting));
  }

  async findOne(id: number): Promise<MeetingEnity> {
    const meeting = await this.meetingRepository.findOneBy({ id });

    if (!meeting) {
      throw new NotFoundException(`Meeting with ID ${id} not found.`);
    }

    return new MeetingEnity(meeting);
  }

  async remove(id: number): Promise<MeetingEnity> {
    const meeting = await this.findOne(id);

    if (!meeting) {
      throw new NotFoundException(`Meeting with ID ${id} not found.`);
    }

    await this.meetingRepository.delete(meeting);
    return new MeetingEnity(meeting);
  }
}
