import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './entities/enrollment.entity';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepository: Repository<Enrollment>,
  ) {}
  async create(createEnrollmentDto: CreateEnrollmentDto) {
    try {
      const enrollment = this.enrollmentRepository.create(createEnrollmentDto);
      return await this.enrollmentRepository.save(enrollment);
    } catch (error) {
      if (error.code === '23505') {
        // Duplicate entry error code in PostgreSQL
        throw new HttpException(
          ' you are already Classroom ',
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

  async findAll() {
    return await this.enrollmentRepository.find();
  }

  // TODO: optimize by only retrieving emails from db
  async findStudentEmailsByClassroomId(classroomId: number): Promise<string[]> {
    const enrollments = await this.enrollmentRepository.find({
      where: { classroomId },
      relations: ['student'], // ensure that the student relation is loaded
    });

    return enrollments.map(
      (enrollment) => enrollment['student']['common']['email'],
    );
  }

  async findStudentEnrollmentsByStudentId(
    studentId: number,
  ): Promise<Enrollment[]> {
    const enrollments = await this.enrollmentRepository.find({
      where: { studentId },
    });
    return enrollments;
  }

  async findOne(id: number) {
    return await this.enrollmentRepository.findOneBy(id);
  }

  async update(id: number, updateEnrollmentDto: UpdateEnrollmentDto) {
    return await this.enrollmentRepository.update(id, updateEnrollmentDto);
  }

  async remove(id: number) {
    const result = await this.enrollmentRepository.delete(id);
    return `Deleted ${result.affected} enrollment`;
  }
}
