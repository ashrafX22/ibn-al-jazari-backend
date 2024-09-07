import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { Classroom } from 'src/models/entities/classroom.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { EnrollmentService } from '../enrollment/enrollment.service';
import { classroomEntity } from './entities/classroom.entity';

@Injectable()
export class ClassroomService {
  constructor(
    @InjectRepository(Classroom)
    private readonly classroomRepository: Repository<Classroom>,
    private readonly enrollmentService: EnrollmentService,
  ) { }

  async create(
    createClassroomDto: CreateClassroomDto,
  ): Promise<classroomEntity> {
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

  async findOne(id: number): Promise<classroomEntity> {
    const classroom = await this.classroomRepository.findOneBy({ id });

    if (!classroom) {
      throw new HttpException('Classroom not found', HttpStatus.NOT_FOUND);
    }

    return new classroomEntity(classroom);
  }

  async findClassroomDetails(id: number): Promise<classroomEntity[]> {
    const classrooms = await this.classroomRepository
      .createQueryBuilder('classroom')
      .leftJoin('classroom.enrollments', 'enrollment')
      .leftJoin('enrollment.student', 'student')
      .leftJoin('classroom.appointments', 'appointment')
      .select([
        'classroom.name AS "classroomName"',
        'student.name AS "studentName"',
        'student.email AS "studentEmail"',
        'appointment.day AS "appointmentDay"',
        'appointment.startTime AS "appointmentStartTime"',
      ])
      .where('classroom.id = :id', { id })
      .orderBy('appointment.startTime', 'ASC')
      .getRawMany();

    if (!classrooms) {
      throw new HttpException('Classroom not found', HttpStatus.NOT_FOUND);
    }

    return classrooms.map((classroom) => new classroomEntity(classroom));
  }

  async findMeetingsByTeacherId(teacherId: number) {
    const classrooms = await this.classroomRepository
      .createQueryBuilder('classroom')
      .innerJoin('classroom.subject', 'subject')
      .leftJoin('classroom.meetings', 'meeting')
      .leftJoinAndSelect('classroom.appointments', 'appointment')
      .select([
        'classroom.id as "classroomId"',
        'classroom.name AS "classroomName"',
        'subject.name AS "subjectName"',
        'meeting.link AS "meetingLink"',
        'appointment.day AS "appointmentDay"',
        'appointment.startTime AS "appointmentStartTime"',
      ])
      .where('classroom.teacherId = :teacherId', { teacherId })
      .orderBy('appointment.startTime', 'ASC')
      .getRawMany();
    return classrooms.map((classroom) => new classroomEntity(classroom));
  }

  async findMeetingsByStudentId(studentId: number) {
    const enrollments =
      await this.enrollmentService.findEnrollmentsByStudentId(studentId);

    const classroomIds = enrollments.map(
      (enrollment) => enrollment['classroomId'],
    );

    const classrooms = await this.classroomRepository
      .createQueryBuilder('classroom')
      .innerJoin('classroom.subject', 'subject')
      .leftJoin('classroom.meetings', 'meeting')
      .leftJoin('classroom.appointments', 'appointment')
      .select([
        'classroom.id as "classroomId"',
        'classroom.name as "classroomName"',
        'subject.name as "subjectName"',
        'meeting.link as "meetingLink"',
        'appointment.day as "appointmentDay"',
        'appointment.startTime as "appointmentStartTime"',
      ])
      .where('classroom.id IN (:...classroomIds)', { classroomIds })
      .orderBy('appointment.startTime', 'ASC')
      .getRawMany();
    return classrooms.map((classroom) => new classroomEntity(classroom));
  }

  async findClassroomsByTeacherId(
    teacherId: number,
  ): Promise<classroomEntity[]> {
    const classrooms = await this.classroomRepository
      .createQueryBuilder('classroom')
      .leftJoinAndSelect('classroom.subject', 'subject')
      .select(['classroom.id', 'classroom.name', 'subject.name'])
      .where('classroom.teacherId = (:teacherId)', { teacherId })
      .getMany();

    return classrooms.map((classroom) => new classroomEntity(classroom));
  }

  async findClassroomsByStudentId(
    studentId: number,
  ): Promise<classroomEntity[]> {
    const enrollments =
      await this.enrollmentService.findEnrollmentsByStudentId(studentId);

    const classroomIds = enrollments.map(
      (enrollment) => enrollment['classroomId'],
    );

    const classrooms = await this.classroomRepository
      .createQueryBuilder('classroom')
      .leftJoinAndSelect('classroom.subject', 'subject')
      .select(['classroom.id', 'classroom.name', 'subject.name'])
      .where('classroom.id IN (:...classroomIds)', { classroomIds })
      .getMany();

    return classrooms.map((classroom) => new classroomEntity(classroom));
  }

  async update(
    id: number,
    updateClassroomDto: UpdateClassroomDto,
  ): Promise<classroomEntity> {
    await this.classroomRepository.update(id, updateClassroomDto);
    const updatedClassroom = await this.classroomRepository.findOneBy({ id });
    if (!updatedClassroom) {
      throw new HttpException('Classroom not found', HttpStatus.NOT_FOUND);
    }
    return new classroomEntity(updatedClassroom);
  }

  async remove(id: number): Promise<classroomEntity> {
    const classroom = await this.classroomRepository.findOneBy({ id });
    if (!classroom) {
      throw new HttpException('Classroom not found', HttpStatus.NOT_FOUND);
    }
    await this.classroomRepository.delete(id);
    return new classroomEntity(classroom);
  }
}
