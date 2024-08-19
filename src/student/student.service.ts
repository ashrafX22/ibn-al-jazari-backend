import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../models//entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { calculateAge } from 'utils/date-utils';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  // Create a new student
  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const student = this.studentRepository.create({
      common: {
        username: createStudentDto.username,
        email: createStudentDto.email,
        name: createStudentDto.name,
        password: createStudentDto.password,
        gender: createStudentDto.gender,
        phoneNumber: createStudentDto.phoneNumber,
        dateOfBirth: createStudentDto.dateOfBirth,
        accessToken: createStudentDto.accessToken,
        refreshRoken: createStudentDto.refreshRoken,
      },
    });

    return await this.studentRepository.save(student);
  }

  // Find all students
  async findAll(): Promise<Student[]> {
    return await this.studentRepository.find();
  }

  // Find a student by ID
  async findOne(id: number): Promise<Student> {
    return await this.studentRepository.findOne({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<Student> {
    return await this.studentRepository.findOne({
      where: {
        common: {
          email,
        },
      },
    });
  }

  // Update a student's information
  async update(
    id: number,
    updateStudentDto: Partial<CreateStudentDto>,
  ): Promise<Student> {
    await this.studentRepository.update(id, {
      common: {
        name: updateStudentDto.name,
        gender: updateStudentDto.gender,

        accessToken: updateStudentDto.accessToken,
        refreshRoken: updateStudentDto.refreshRoken,
      },
    });
    return this.findOne(id);
  }

  // Delete a student by ID
  async remove(id: number): Promise<void> {
    await this.studentRepository.delete(id);
  }
}
