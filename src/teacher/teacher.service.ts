import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './../models/entities/teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { TeacherEntity } from './entities/teacher.entity';

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
        phoneNumber: createTeacherDto.phoneNumber,
        dateOfBirth: createTeacherDto.dateOfBirth,
        accessToken: createTeacherDto.accessToken,
        refreshToken: createTeacherDto.refreshToken,
      },
      summary: createTeacherDto.summary,
      proficiencyLevel: createTeacherDto.proficiencyLevel,
    });

    return await this.teacherRepository.save(teacher);
  }

  // Find all teachers
  async findAll(): Promise<TeacherEntity[]> {
    const teachers = await this.teacherRepository.find();
    return teachers.map(
      (teacher) =>
        new TeacherEntity({
          id: teacher.id,
          ...teacher.common,
          summary: teacher.summary,
          proficiencyLevel: teacher.proficiencyLevel,
        }),
    );
  }

  // Find a teacher by ID
  async findById(id: number): Promise<TeacherEntity> {
    const teacher = await this.teacherRepository.findOneBy({ id });
    const { common, ...rest } = teacher;
    return new TeacherEntity({
      ...common,
      ...rest,
    });
  }

  async findByEmail(email: string): Promise<TeacherEntity | null> {
    const teacher = await this.teacherRepository.findOneBy({
      common: {
        email,
      },
    });
    if (!teacher) return null;
    const { common, ...rest } = teacher;
    return new TeacherEntity({
      ...common,
      ...rest,
    });
  }

  // Update a teacher's information
  async update(
    id: number,
    updateTeacherDto: Partial<CreateTeacherDto>,
  ): Promise<TeacherEntity | null> {
    const result = await this.teacherRepository.update(id, {
      common: {
        name: updateTeacherDto.name,
        accessToken: updateTeacherDto.accessToken,
        refreshToken: updateTeacherDto.refreshToken,
      },
      summary: updateTeacherDto.summary,
    });

    if (result.affected === 1) {
      const updatedTeacher = await this.teacherRepository.findOneBy({ id });
      if (updatedTeacher) {
        return new TeacherEntity({
          id: updatedTeacher.id,
          ...updatedTeacher.common,
          summary: updatedTeacher.summary,
          proficiencyLevel: updatedTeacher.proficiencyLevel,
        });
      }
    }

    return null;
  }

  // Delete a teacher by ID
  async remove(id: number): Promise<void> {
    await this.teacherRepository.delete(id);
  }
}
