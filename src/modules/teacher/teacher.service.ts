import { ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from '../../models/entities/teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { TeacherEntity } from './entities/teacher.entity';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) { }

  // Create a new teacher
  async create(createTeacherDto: CreateTeacherDto): Promise<TeacherEntity> {

    const { email, name, password, gender, phoneNumber, dateOfBirth,
      accessToken, refreshToken, summary, experience } = createTeacherDto;

    try {
      const teacher = this.teacherRepository.create({
        common: {
          email,
          name,
          password,
          gender,
          phoneNumber,
          dateOfBirth,
          accessToken,
          refreshToken,
        },
        summary,
        experience
      });

      await this.teacherRepository.save(teacher);

      const { common, ...rest } = teacher;
      return new TeacherEntity({
        ...common,
        ...rest,
      });
    } catch (error) {
      if (error.code === '23505')
        throw new ConflictException(error.detail);
      else
        throw new InternalServerErrorException(error.detail);
    }
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
          experience: teacher.experience,
        }),
    );
  }

  // Find a teacher by ID
  async findById(id: number): Promise<TeacherEntity> {
    const teacher = await this.teacherRepository.findOneBy({ id });

    if (!teacher) return null;

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
    updateTeacherDto: UpdateTeacherDto,
  ): Promise<TeacherEntity | null> {
    const teacher = await this.teacherRepository.findOneBy({ id });

    if (!teacher) return null;

    const result = await this.teacherRepository.update(id, {
      common: {
        name: updateTeacherDto.name || teacher.common.name,
        phoneNumber: updateTeacherDto.phoneNumber || teacher.common.phoneNumber,
        accessToken: updateTeacherDto.accessToken || teacher.common.accessToken,
        refreshToken:
          updateTeacherDto.refreshToken || teacher.common.refreshToken,
      },
      summary: updateTeacherDto.summary || teacher.summary,
    });

    if (result.affected === 1) {
      const updatedTeacher = await this.teacherRepository.findOneBy({ id });
      if (updatedTeacher) {
        return new TeacherEntity({
          id: updatedTeacher.id,
          ...updatedTeacher.common,
          summary: updatedTeacher.summary,
          experience: updatedTeacher.experience,
        });
      }
    }

    return null;
  }

  // Delete a teacher by ID
  async remove(id: number): Promise<void> {
    const teacher = await this.teacherRepository.findOneBy({ id });

    if (!teacher) return null;

    await this.teacherRepository.delete(id);
  }
}
