import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from 'src/models/entities/subject.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubjectEntity } from './entities/subject.entity';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  async create(createSubjectDto: CreateSubjectDto): Promise<SubjectEntity> {
    try {
      const subject = this.subjectRepository.create(createSubjectDto);
      const savedSubject = await this.subjectRepository.save(subject);
      return new SubjectEntity(savedSubject);
    } catch (error) {
      throw new InternalServerErrorException('An unexpected error occurred.');
    }
  }

  async findAll(): Promise<SubjectEntity[]> {
    const subjects = await this.subjectRepository.find();
    return subjects.map((subject) => new SubjectEntity(subject));
  }

  async findOne(id: string): Promise<SubjectEntity> {
    const subject = await this.subjectRepository.findOneBy({ id });
    if (!subject) {
      throw new InternalServerErrorException('Subject not found.');
    }
    return new SubjectEntity(subject);
  }

  async update(
    id: string,
    updateSubjectDto: UpdateSubjectDto,
  ): Promise<SubjectEntity> {
    await this.subjectRepository.update(id, updateSubjectDto);
    const updatedSubject = await this.subjectRepository.findOneBy({ id });
    if (!updatedSubject) {
      throw new InternalServerErrorException('Subject not found.');
    }
    return new SubjectEntity(updatedSubject);
  }

  async remove(id: string): Promise<SubjectEntity> {
    const subject = await this.subjectRepository.findOneBy({ id });
    if (!subject) {
      throw new InternalServerErrorException('Subject not found.');
    }
    await this.subjectRepository.delete(id);
    return new SubjectEntity(subject);
  }
}
