import { Injectable } from '@nestjs/common';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { Classroom } from 'src/models/entities/classroom.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { EnrollmentService } from '../enrollment/enrollment.service';

@Injectable()
export class ClassroomService {
  constructor(
    @InjectRepository(Classroom)
    private readonly classroomRepository: Repository<Classroom>,
    private readonly enrollmentService: EnrollmentService,
  ) {}
  async create(createClassroomDto: CreateClassroomDto) {
    const classroom = this.classroomRepository.create(createClassroomDto);
    return await this.classroomRepository.save(classroom);
  }

  async findAll() {
    return await this.classroomRepository.find();
  }

  //find all rooms related to the given teacher
  async getClassroomsByTeacherId(teacherId: number): Promise<Classroom[]> {
    return await this.classroomRepository.find({
      where: { teacherId },
      // relations: ['teacher'],
    });
  }
  async getClassroomsByStudentId(studentId: number): Promise<Classroom[]> {
    const enrollments =
      await this.enrollmentService.findStudentEnrollmentsByStudentId(studentId);

    const classroomIds = enrollments.map(
      (enrollment) => enrollment['classroomId'],
    );

    return await this.classroomRepository.find({
      where: { id: In(classroomIds) },
    });
  }

  async findOne(id: number) {
    return await this.classroomRepository.findOneBy({ id });
  }

  async update(id: number, updateClassroomDto: UpdateClassroomDto) {
    return await this.classroomRepository.update(id, updateClassroomDto);
  }

  async remove(id: number) {
    return await this.classroomRepository.delete(id);
  }
}
