import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnrollmentEntity } from './entities/enrollment.entity';
import { Enrollment } from 'src/models/entities/enrollment.entity';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepository: Repository<Enrollment>,
  ) {}

  async create(
    classroomId: string,
    studentId: string,
  ): Promise<EnrollmentEntity> {
    // check if student has already reached the maximum number of enrollments
    const studentEnrollments = await this.findEnrollmentsByStudentId(studentId);
    if (studentEnrollments.length > 7) {
      throw new HttpException(
        'You have reached the maximum number of enrollments',
        HttpStatus.BAD_REQUEST,
      );
    }

    // check if classroom has reached the maximum number of enrollments
    const classroomEnrollments =
      await this.findEnrollmentsByClassroomId(classroomId);
    if (classroomEnrollments.length > 5) {
      throw new HttpException(
        'This classroom has reached the maximum number of enrollments',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const enrollment = this.enrollmentRepository.create({
        classroomId,
        studentId,
      });
      const savedEnrollment = await this.enrollmentRepository.save(enrollment);
      return new EnrollmentEntity(savedEnrollment);
    } catch (error) {
      if (error.code === '23505') {
        // Duplicate entry error code in PostgreSQL
        throw new HttpException(
          'You are already enrolled in this classroom',
          HttpStatus.CONFLICT,
        );
      } else {
        throw new HttpException(
          'Failed to create enrollment',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async findEnrollmentsByClassroomId(
    classroomId: string,
  ): Promise<Enrollment[]> {
    const enrollments = await this.enrollmentRepository.find({
      where: { classroomId },
    });
    return enrollments;
  }

  async findAll(): Promise<EnrollmentEntity[]> {
    const enrollments = await this.enrollmentRepository.find();
    return enrollments.map((enrollment) => new EnrollmentEntity(enrollment));
  }

  async findStudentEmailsByClassroomId(classroomId: string): Promise<string[]> {
    const enrollments = await this.enrollmentRepository.find({
      where: { classroomId },
      relations: ['student'], // ensure that the student relation is loaded
    });

    return enrollments.map(
      (enrollment) => enrollment['student']['common']['email'],
    );
  }

  async findEnrollmentsByStudentId(
    studentId: string,
  ): Promise<EnrollmentEntity[]> {
    const enrollments = await this.enrollmentRepository.find({
      where: { studentId },
    });
    return enrollments.map((enrollment) => new EnrollmentEntity(enrollment));
  }

  async findOne(
    classroomId: string,
    studentId: string,
  ): Promise<EnrollmentEntity> {
    const enrollment = await this.enrollmentRepository.findOneBy({
      studentId,
      classroomId,
    });

    if (!enrollment) return null;

    return new EnrollmentEntity(enrollment);
  }

  async update(
    studentId: string,
    classroomId: string,
    updateEnrollmentDto: UpdateEnrollmentDto,
  ): Promise<EnrollmentEntity> {
    await this.enrollmentRepository.update(
      { studentId, classroomId },
      updateEnrollmentDto,
    );
    const updatedEnrollment = await this.enrollmentRepository.findOneBy({
      studentId,
      classroomId,
    });

    if (!updatedEnrollment) {
      throw new HttpException('Enrollment not found', HttpStatus.NOT_FOUND);
    }

    return new EnrollmentEntity(updatedEnrollment);
  }

  async remove(
    classroomId: string,
    studentId: string,
  ): Promise<EnrollmentEntity> {
    const enrollment = await this.findOne(classroomId, studentId);
    if (!enrollment) {
      throw new HttpException('Enrollment not found', HttpStatus.NOT_FOUND);
    }

    await this.enrollmentRepository.delete({ studentId, classroomId });
    return new EnrollmentEntity(enrollment);
  }
}
