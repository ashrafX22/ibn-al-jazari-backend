import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentEntity } from './entities/student.entity';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreateStudentDto) {
    return await this.prisma.student.create({
      data,
    });
  }

  async upsert(createStudentDto: CreateStudentDto) {
    const { name, email, access_token, refresh_token } = createStudentDto;
    console.log('student service');
    return this.prisma.student.upsert({
      where: {
        email: email,
      },
      create: {
        ...createStudentDto
      },
      update: {
        name: name,
        access_token: access_token,
        refresh_token: refresh_token
      },
    });
  }

  async findAll(): Promise<StudentEntity[]> {
    const students = await this.prisma.student.findMany();
    return students.map((student) => new StudentEntity(student));
  }

  async findOne(id: number): Promise<StudentEntity> {
    const student = await this.prisma.student.findUnique({ where: { id } });
    if (!student)
      throw new HttpException('Student not found', HttpStatus.BAD_REQUEST);
    return student;
  }

  async findByEmail(email: string) {
    const student = await this.prisma.student.findUnique({ where: { email } });
    // if (!student)
    //   throw new HttpException('Student not found', HttpStatus.BAD_REQUEST);
    return student;
  }

  async update(id: number, data: UpdateStudentDto) {
    const updateStudent = await this.prisma.student.update({
      where: { id },
      data,
    });
    return updateStudent;
  }

  async remove(id: number) {
    await this.findOne(id);
    const deleteStudent = await this.prisma.student.delete({
      where: {
        id,
      },
    });
    return deleteStudent;
  }
}
