import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { Classroom } from 'src/models/entities/classroom.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { classroomEntity } from './entities/classroom.entity';
import { getDayIndex } from 'src/models/enums/day.enum';
import { CreateAppointmentDto } from '../appointment/dto/create-appointment.dto';
import { AppointmentService } from '../appointment/appointment.service';
import { MeetingService } from '../meeting/meeting.service';
import { Jwt } from '../auth/jwt/jwt.interface';
import { MeetingProvider } from '../meeting/enums/meeting-provider.enum';

@Injectable()
export class ClassroomService {
  constructor(
    @InjectRepository(Classroom)
    private readonly classroomRepository: Repository<Classroom>,
    private readonly enrollmentService: EnrollmentService,
    private readonly appointmentService: AppointmentService,
    private readonly meetingService: MeetingService,
  ) {}

  async create(
    createClassroomDto: CreateClassroomDto,
  ): Promise<classroomEntity> {
    // check if teacher has reached the maximum number of classrooms
    // so that he can't spam classrooms
    const { teacherId } = createClassroomDto;
    const classrooms = await this.findClassroomsByTeacherId(teacherId);
    if (classrooms.length > 20) {
      throw new HttpException(
        'You have reached the maximum number of classrooms',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const classroom = this.classroomRepository.create(createClassroomDto);

      const savedClassroom = await this.classroomRepository.save(classroom);

      return new classroomEntity(savedClassroom);
    } catch (error) {
      if (error.code === '23505') {
        // Duplicate entry error code in PostgreSQL
        throw new HttpException(
          'Classroom with this name already exists',
          HttpStatus.CONFLICT,
        );
      } else {
        throw new HttpException(
          'Failed to create classroom',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async findAll(): Promise<classroomEntity[]> {
    const classrooms = await this.classroomRepository.find();
    return classrooms.map((classroom) => new classroomEntity(classroom));
  }

  async findOne(id: string): Promise<classroomEntity> {
    const classroom = await this.classroomRepository.findOneBy({ id });

    if (!classroom) {
      throw new HttpException('Classroom not found', HttpStatus.NOT_FOUND);
    }

    return new classroomEntity(classroom);
  }

  async findTeacherId(id: string): Promise<String> {
    try {
      const classroom = await this.classroomRepository
        .createQueryBuilder('classroom')
        .select('classroom.teacherId')
        .where('classroom.id = :id', { id })
        .getOne();

      return classroom.teacherId;
    } catch (error: any) {
      throw new NotFoundException('classroom not found');
    }
  }

  // works. However, the query itself return all fields.
  async findClassroomDetails(id: string): Promise<any> {
    const classroom = await this.classroomRepository
      .createQueryBuilder('classroom')
      .leftJoinAndSelect('classroom.subject', 'subject')
      .leftJoinAndSelect('classroom.appointments', 'appointment')
      .leftJoinAndSelect('classroom.enrollments', 'enrollment')
      .leftJoinAndSelect('enrollment.student', 'student')
      .where('classroom.id = :id', { id })
      .getOne();

    if (!classroom)
      throw new HttpException('Classroom not found', HttpStatus.NOT_FOUND);

    return {
      id: classroom.id,
      name: classroom.name,
      subject: {
        name: classroom.subject.name,
      },
      students: classroom.enrollments.map((enrollment) => ({
        id: enrollment.student.id,
        name: enrollment.student.common.name,
        email: enrollment.student.common.email,
      })),
      appointments: classroom.appointments
        .map((appointment) => ({
          id: appointment.id,
          day: appointment.day,
          startTime: appointment.startTime,
        }))
        .sort((a, b) => {
          const dayComparison = getDayIndex(a.day) - getDayIndex(b.day);

          if (dayComparison !== 0) return dayComparison;

          return a.startTime.localeCompare(b.startTime);
        }),
    };
  }

  async findWeeklyLessonsByTeacherId(teacherId: string) {
    try {
      const weeklyLessons = await this.classroomRepository
        .createQueryBuilder('classroom')
        .innerJoin('classroom.subject', 'subject')
        .leftJoin('classroom.meeting', 'meeting')
        .leftJoin('classroom.appointments', 'appointment')
        .select([
          'classroom.id AS "classroomId"',
          'classroom.name AS "classroomName"',
          'subject.name AS "subjectName"',
          'meeting.link AS "meetingLink"',
          'appointment.day AS "appointmentDay"',
          'appointment.startTime AS "appointmentStartTime"',
        ])
        .where('classroom.teacherId = :teacherId', { teacherId })
        .orderBy('appointment.startTime', 'ASC')
        .getRawMany();

      return weeklyLessons
        .filter((classroom) => classroom.meetingLink)
        .map((classroom) => new classroomEntity(classroom));
    } catch (error) {
      console.log('findWeeklyLessonsByTeacherId query error', error);
      return [];
    }
  }

  async findWeeklyLessonsByStudentId(studentId: string) {
    try {
      const enrollments =
        await this.enrollmentService.findEnrollmentsByStudentId(studentId);

      const classroomIds = enrollments.map(
        (enrollment) => enrollment['classroomId'],
      );

      const weeklyLessons = await this.classroomRepository
        .createQueryBuilder('classroom')
        .innerJoin('classroom.subject', 'subject')
        .leftJoin('classroom.meeting', 'meeting')
        .leftJoin('classroom.appointments', 'appointment')
        .select([
          'classroom.id AS "classroomId"',
          'classroom.name AS "classroomName"',
          'subject.name AS "subjectName"',
          'meeting.link AS "meetingLink"',
          'appointment.day AS "appointmentDay"',
          'appointment.startTime AS "appointmentStartTime"',
        ])
        .where('classroom.id IN (:...classroomIds)', { classroomIds })
        .orderBy('appointment.startTime', 'ASC')
        .getRawMany();

      return weeklyLessons
        .filter((classroom) => classroom.meetingLink)
        .map((classroom) => new classroomEntity(classroom));
    } catch (error) {
      console.log('findWeeklyLessonsByStudentId query error', error);
      return [];
    }
  }

  async findClassroomsByTeacherId(
    teacherId: string,
  ): Promise<classroomEntity[]> {
    try {
      const classrooms = await this.classroomRepository
        .createQueryBuilder('classroom')
        .leftJoin('classroom.subject', 'subject')
        .select([
          'classroom.id AS "id"',
          'classroom.name AS "name"',
          'subject.name AS "subjectName"',
        ])
        .where('classroom.teacherId = (:teacherId)', { teacherId })
        .getRawMany();

      return classrooms.map((classroom) => new classroomEntity(classroom));
    } catch (error) {
      return [];
    }
  }

  async findClassroomsByStudentId(
    studentId: string,
  ): Promise<classroomEntity[]> {
    try {
      const enrollments =
        await this.enrollmentService.findEnrollmentsByStudentId(studentId);

      const classroomIds = enrollments.map(
        (enrollment) => enrollment['classroomId'],
      );

      const classrooms = await this.classroomRepository
        .createQueryBuilder('classroom')
        .leftJoin('classroom.subject', 'subject')
        .select([
          'classroom.id AS "id"',
          'classroom.name AS "name"',
          'subject.name AS "subjectName"',
        ])
        .where('classroom.id IN (:...classroomIds)', { classroomIds })
        .getRawMany();

      return classrooms.map((classroom) => new classroomEntity(classroom));
    } catch (error) {
      return [];
    }
  }

  async findJoinableClassrooms(studentId: string): Promise<classroomEntity[]> {
    try {
      const enrollments =
        await this.enrollmentService.findEnrollmentsByStudentId(studentId);

      const classroomIds = enrollments.map(
        (enrollment) => enrollment['classroomId'],
      );

      console.log('classroomIds', classroomIds);

      const query = this.classroomRepository
        .createQueryBuilder('classroom')
        .leftJoin('classroom.subject', 'subject')
        .leftJoin('classroom.teacher', 'teacher')
        .select([
          'classroom.id AS "id"',
          'classroom.name AS "name"',
          'subject.id AS "subjectId"',
          'subject.name AS "subjectName"',
          'teacher.id AS "teacherId"',
          'teacher.name AS "teacherName"',
        ]);

      if (classroomIds.length > 0)
        query.where('classroom.id NOT IN (:...classroomIds)', { classroomIds });

      const classrooms = await query.getRawMany();

      return classrooms.map((classroom) => new classroomEntity(classroom));
    } catch (error) {
      return [];
    }
  }

  async editAppointments(
    creatorDetails: Jwt,
    classroomId: string,
    createAppointmentDtos: CreateAppointmentDto[],
  ) {
    console.log(
      'editAppointments service',
      creatorDetails,
      classroomId,
      createAppointmentDtos,
    );

    if (createAppointmentDtos.length === 0)
      throw new BadRequestException('No Appointments Provided');

    // delete all classroom appointments
    await this.appointmentService.removeByClassroomId(classroomId);
    console.log('deleted old appointments');

    // filter ids
    createAppointmentDtos = createAppointmentDtos.map(
      (createAppointmentDto) => {
        return {
          day: createAppointmentDto.day,
          startTime: createAppointmentDto.startTime,
        };
      },
    );
    console.log('filtered appointments', createAppointmentDtos);

    // add new appointments
    for (const createAppointmentDto of createAppointmentDtos)
      await this.appointmentService.create(classroomId, createAppointmentDto);
    console.log('added new appointments');

    // delete old meeting
    // TODO: dynamically create meeting based on provider
    await this.meetingService.removeByClassroomId(
      creatorDetails,
      classroomId,
      MeetingProvider.GOOGLE,
    );
    console.log('old meeting deleted');

    // create new meeting
    const classroomDetails = await this.findClassroomDetails(classroomId);
    await this.meetingService.create(creatorDetails, classroomDetails, {
      provider: MeetingProvider.GOOGLE,
    });
  }

  async update(
    id: string,
    updateClassroomDto: UpdateClassroomDto,
  ): Promise<classroomEntity> {
    await this.classroomRepository.update(id, updateClassroomDto);
    const updatedClassroom = await this.classroomRepository.findOneBy({ id });
    if (!updatedClassroom) {
      throw new HttpException('Classroom not found', HttpStatus.NOT_FOUND);
    }
    return new classroomEntity(updatedClassroom);
  }

  async remove(id: string): Promise<classroomEntity> {
    const classroom = await this.classroomRepository.findOneBy({ id });
    if (!classroom) {
      throw new HttpException('Classroom not found', HttpStatus.NOT_FOUND);
    }
    await this.classroomRepository.delete(id);
    return new classroomEntity(classroom);
  }
}
