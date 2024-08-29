import { Injectable } from '@nestjs/common';
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
  ) { }
  async create(createEnrollmentDto: CreateEnrollmentDto) {
    const enrollment = this.enrollmentRepository.create(createEnrollmentDto);
    return await this.enrollmentRepository.save(enrollment);
  }

  async findAll() {
    return await this.enrollmentRepository.find();
  }

  async findStudentsByClassroomId(classroomId: number) {
    const enrollments = await this.enrollmentRepository.find({
      where: {
        classroomId
      },
      relations: {
        student: true
      },
      select: {
        student: {
          id: true,
          common: {
            name: true,
            email: true,
          },
        },
      }
    });

    return enrollments.map((enrollment) => ({
      id: enrollment['student']['id'],
      name: enrollment['student']['common']['name'],
      email: enrollment['student']['common']['email'],
    }));
  }

  // TODO: optimize by only retrieving emails from db
  async findStudentEmailsByClassroomId(classroomId: number): Promise<string[]> {
    const enrollments = await this.enrollmentRepository.find({
      where: { classroomId },
      relations: ['student'], // ensure that the student relation is loaded
    });

    return enrollments.map(enrollment => enrollment['student']['common']['email']);
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
