import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../models/entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentEntity } from './entities/student.entity';

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
        refreshToken: createStudentDto.refreshToken,
      },
    });

    return await this.studentRepository.save(student);
  }

  // Find all students
  async findAll(): Promise<StudentEntity[]> {
    const students = await this.studentRepository.find();
    return students.map(
      (student) =>
        new StudentEntity({
          id: student.id,
          ...student.common,
        }),
    );
  }

  // Find a student by ID
  async findById(id: number): Promise<StudentEntity> {
    const student = await this.studentRepository.findOneBy({ id });
    const { common, ...rest } = student;
    return new StudentEntity({
      ...common,
      ...rest,
    });
  }

  async findByEmail(email: string): Promise<StudentEntity | null> {
    const student = await this.studentRepository.findOneBy({
      common: {
        email,
      },
    });
    const { common, ...rest } = student;
    return new StudentEntity({
      ...common,
      ...rest,
    });
  }

  // Update a student's information
  async update(
    id: number,
    updateTeacherDto: Partial<CreateStudentDto>,
  ): Promise<StudentEntity | null> {
    const result = await this.studentRepository.update(id, {
      common: {
        name: updateTeacherDto.name,
        accessToken: updateTeacherDto.accessToken,
        refreshToken: updateTeacherDto.refreshToken,
      },
    });

    if (result.affected === 1) {
      const updatedTeacher = await this.studentRepository.findOneBy({ id });
      if (updatedTeacher) {
        return new StudentEntity({
          id: updatedTeacher.id,
          ...updatedTeacher.common,
        });
      }
    }

    return null;
  }

  // Delete a student by ID
  async remove(id: number): Promise<void> {
    await this.studentRepository.delete(id);
  }
}
