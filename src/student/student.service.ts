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
  ) { }

  // Create a new student
  async create(createStudentDto: CreateStudentDto): Promise<StudentEntity> {
    const student = this.studentRepository.create({
      common: {
        ...createStudentDto
      },
    });

    return new StudentEntity(await this.studentRepository.save(student));
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
    if (!student) return null;
    const { common, ...rest } = student;
    return new StudentEntity({
      ...common,
      ...rest,
    });
  }

  // Update a student's information
  async update(
    id: number,
    updateStudentDto: Partial<CreateStudentDto>,
  ): Promise<StudentEntity | null> {
    const result = await this.studentRepository.update(id, {
      common: {
        ...updateStudentDto
      },
    });

    if (result.affected === 1) {
      const updatedStudent = await this.studentRepository.findOneBy({ id });
      if (updatedStudent) {
        return new StudentEntity({
          id: updatedStudent.id,
          ...updatedStudent.common,
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
