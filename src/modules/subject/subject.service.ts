import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from 'src/models/entities/subject.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}
  async create(createSubjectDto: CreateSubjectDto) {
    try {
      const subject = this.subjectRepository.create(createSubjectDto);
      return await this.subjectRepository.save(subject);
    } catch (error) {
      throw new InternalServerErrorException('An unexpected error occurred.');
    }
  }

  async findAll() {
    return await this.subjectRepository.find();
  }

  async findOne(id: number) {
    return await this.subjectRepository.findOneBy({ id });
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    return await this.subjectRepository.update(id, updateSubjectDto);
  }

  async remove(id: number) {
    return await this.subjectRepository.delete(id);
  }
}
