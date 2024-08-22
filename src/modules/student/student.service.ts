import { Injectable, ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../../models/entities/student.entity';
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
    try {
      const student = this.studentRepository.create({
        common: {
          ...createStudentDto,
        },
      });

      return new StudentEntity(await this.studentRepository.save(student));
    } catch (error) {
      console.log("create catch");
      if (error.code === '23505')
        throw new ConflictException(error.detail);
      else
        throw new InternalServerErrorException(error.detail);
    }
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

    if (!student) return null;

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
    const student = await this.studentRepository.findOneBy({ id });

    if (!student) return null;

    const result = await this.studentRepository.update(id, {
      common: {
        name: updateStudentDto.name || student.common.name,
        phoneNumber: updateStudentDto.phoneNumber || student.common.phoneNumber,
        accessToken: updateStudentDto.accessToken || student.common.accessToken,
        refreshToken:
          updateStudentDto.refreshToken || student.common.accessToken,
      },
    });

    if (result.affected === 1) {
      const updatedStudent = await this.studentRepository.findOneBy({ id });

      if (!updatedStudent) return null;

      return new StudentEntity({
        id: updatedStudent.id,
        ...updatedStudent.common,
      });
    }

    return null;
  }

  // Delete a student by ID
  async remove(id: number): Promise<void> {
    const student = await this.studentRepository.findOneBy({ id });

    if (!student) return null;

    await this.studentRepository.delete(id);
  }
}
