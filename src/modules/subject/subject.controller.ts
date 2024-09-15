import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  createSubjectSwaggerDoc,
  findAllSubjectsSwaggerDoc,
  findOneSubjectSwaggerDoc,
  removeSubjectSwaggerDoc,
  updateSubjectSwaggerDoc,
} from './subject.swagger';

@ApiTags('subject')
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  @createSubjectSwaggerDoc()
  async create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectService.create(createSubjectDto);
  }

  @Get()
  @findAllSubjectsSwaggerDoc()
  async findAll() {
    return this.subjectService.findAll();
  }

  @Get(':id')
  @findOneSubjectSwaggerDoc()
  async findOne(@Param('id') id: string) {
    return this.subjectService.findOne(+id);
  }

  @Patch(':id')
  @updateSubjectSwaggerDoc()
  async update(
    @Param('id') id: string,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ) {
    return this.subjectService.update(+id, updateSubjectDto);
  }

  @Delete(':id')
  @removeSubjectSwaggerDoc()
  async remove(@Param('id') id: string) {
    return this.subjectService.remove(+id);
  }
}
