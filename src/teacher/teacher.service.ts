import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './../models/entities/teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) { }

  // Create a new teacher
  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const teacher = this.teacherRepository.create({
      common: {
        email: createTeacherDto.email,
        name: createTeacherDto.name,
        password: createTeacherDto.password,
        gender: createTeacherDto.gender,
        age: createTeacherDto.age,
        access_token: createTeacherDto.access_token,
        refresh_token: createTeacherDto.refresh_token,
      },
      summary: createTeacherDto.summary,
      proficiency_level: createTeacherDto.proficiency_level,
    });

    return await this.teacherRepository.save(teacher);
  }

  // Find all teachers
  async findAll(): Promise<Teacher[]> {
    return await this.teacherRepository.find();
  }

  // Find a teacher by ID
  async findOne(id: number): Promise<Teacher> {
    return await this.teacherRepository.findOne({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<Teacher | null> {
    return await this.teacherRepository.findOne({
      where: {
        common: {
          email
        }
      },
    });
  }

  // Update a teacher's information
  async update(
    id: number,
    updateTeacherDto: Partial<CreateTeacherDto>,
  ): Promise<Teacher | null> {
    await this.teacherRepository.update(id, {
      common: {
        name: updateTeacherDto.name,
        age: updateTeacherDto.age,
        access_token: updateTeacherDto.access_token,
        refresh_token: updateTeacherDto.refresh_token,
      },
      summary: updateTeacherDto.summary,
    });
    return this.findOne(id);
  }

  // Delete a teacher by ID
  async remove(id: number): Promise<void> {
    await this.teacherRepository.delete(id);
  }
}
