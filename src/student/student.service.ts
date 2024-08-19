import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../models/entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentInitDto } from './dto/student-init.dto';
import { StudentFollowDto } from './dto/student-follow.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) { }

  // Create a new student
  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const student = this.studentRepository.create({
      common: {
        ...createStudentDto
      },
    });

    return await this.studentRepository.save(student);
  }

  async studentInit(studentInitDto: StudentInitDto) {
    const student = this.studentRepository.create({
      common: {
        ...studentInitDto
      },
    });

    return await this.studentRepository.save(student);
  }

  async studentFollow(id: number, studentFollowDto: StudentFollowDto) {
    await this.studentRepository.update(id, {
      common: {
        ...studentFollowDto,
      },
    });
    return this.findOne(id);
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

  async findByEmail(email: string): Promise<Student | null> {
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
  ): Promise<Student | null> {
    await this.studentRepository.update(id, {
      common: {
        ...updateStudentDto,
      },
    });
    return this.findOne(id);
  }

  // Delete a student by ID
  async remove(id: number): Promise<void> {
    await this.studentRepository.delete(id);
  }
}
