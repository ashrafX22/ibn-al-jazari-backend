import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TeacherService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreateTeacherDto) {
    return await this.prisma.teacher.create({
      data,
    });
  }

  async upsert(createTeacherDto: CreateTeacherDto) {
    const { name, email, access_token, refresh_token } = createTeacherDto;
    console.log('teacher service');
    return this.prisma.teacher.upsert({
      where: {
        email: email,
      },
      create: {
        ...createTeacherDto
      },
      update: {
        name: name,
        access_token: access_token,
        refresh_token: refresh_token
      },
    });
  }

  async findAll() {
    return await this.prisma.teacher.findMany();
  }

  async findOne(id: number) {
    const teacher = await this.prisma.teacher.findUnique({ where: { id } });
    if (!teacher)
      throw new HttpException('Teacher not found', HttpStatus.BAD_REQUEST);
    return teacher;
  }

  async findByEmail(email: string) {
    const teacher = await this.prisma.teacher.findUnique({ where: { email } });
    if (!teacher)
      throw new HttpException('Teacher not found', HttpStatus.BAD_REQUEST);
    return teacher;
  }

  async update(id: number, data: UpdateTeacherDto) {
    const updateTeacher = await this.prisma.teacher.update({
      where: { id },
      data,
    });
    return updateTeacher;
  }

  async remove(id: number) {
    await this.findOne(id);
    const deleteTeacher = await this.prisma.teacher.delete({
      where: {
        id,
      },
    });
    return deleteTeacher;
  }
}
