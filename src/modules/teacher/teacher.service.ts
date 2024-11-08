import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from '../../models/entities/teacher.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { TeacherEntity } from './entities/teacher.entity';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { flattenObject } from 'src/shared/utils/flatten-object.util';
import { TeacherStatus } from 'src/models/enums/teacher-status.enum';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) { }

  // Create a new teacher
  async create(createTeacherDto: CreateTeacherDto): Promise<TeacherEntity> {
    const {
      email,
      name,
      password,
      gender,
      phoneNumber,
      dateOfBirth,
      googleRefreshToken,
      summary,
      experience,
      ijazaPhotoUrl,
    } = createTeacherDto;

    try {
      const teacher = this.teacherRepository.create({
        common: {
          email,
          name,
          password,
          gender,
          phoneNumber,
          dateOfBirth,
          googleRefreshToken,
        },
        summary,
        experience,
        ijazaPhotoUrl
      });

      const savedTeacher = await this.teacherRepository.save(teacher);

      return new TeacherEntity(flattenObject(savedTeacher));
    } catch (error) {
      if (error.code === '23505') throw new ConflictException(error.detail);
      else throw new InternalServerErrorException(error.detail);
    }
  }

  // Find all teachers
  async findAll(): Promise<TeacherEntity[]> {
    const teachers = await this.teacherRepository.find();
    return teachers.map((teacher) => new TeacherEntity(flattenObject(teacher)));
  }

  // Find a teacher by ID
  async findById(id: string): Promise<TeacherEntity> {
    const teacher = await this.teacherRepository.findOneBy({ id });

    if (!teacher) return null;

    return new TeacherEntity(flattenObject(teacher));
  }

  async findByEmail(email: string): Promise<TeacherEntity | null> {
    const teacher = await this.teacherRepository.findOne({
      where: {
        common: {
          email,
        }
      }
    });

    if (!teacher) return null;

    return new TeacherEntity(flattenObject(teacher));
  }

  // Update a teacher's information
  async update(
    id: string,
    updateTeacherDto: UpdateTeacherDto,
  ): Promise<TeacherEntity | null> {
    const teacher = await this.teacherRepository.findOneBy({ id });

    if (!teacher) return null;

    await this.teacherRepository.update(id, {
      common: {
        name: updateTeacherDto.name || teacher.common.name,
        phoneNumber: updateTeacherDto.phoneNumber || teacher.common.phoneNumber,
        googleRefreshToken:
          updateTeacherDto.googleRefreshToken ||
          teacher.common.googleRefreshToken,
      },
      summary: updateTeacherDto.summary || teacher.summary,
    });

    const updatedTeacher = await this.teacherRepository.findOneBy({ id });

    return new TeacherEntity(flattenObject(updatedTeacher));
  }

  async approve(id: string): Promise<TeacherEntity | null> {
    const teacher = await this.teacherRepository.findOneBy({ id });

    if (!teacher) return null;

    await this.teacherRepository.update(id, {
      status: TeacherStatus.APPROVED
    });

    const approvedTeacher = await this.teacherRepository.findOneBy({ id });

    return new TeacherEntity(flattenObject(approvedTeacher));
  }

  // Delete a teacher by ID
  async remove(id: string): Promise<void> {
    const teacher = await this.teacherRepository.findOneBy({ id });

    if (!teacher) return null;

    await this.teacherRepository.delete(id);
  }
}
