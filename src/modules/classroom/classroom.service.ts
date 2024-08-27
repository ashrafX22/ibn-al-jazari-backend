import { Injectable } from '@nestjs/common';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { Classroom } from 'src/models/entities/classroom.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClassroomService {
  constructor(
    @InjectRepository(Classroom)
    private readonly classroomRepository: Repository<Classroom>,
  ) {}
  async create(createClassroomDto: CreateClassroomDto) {
    const classroom = this.classroomRepository.create(createClassroomDto);
    return await this.classroomRepository.save(classroom);
  }

  async findAll() {
    return await this.classroomRepository.find();
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
