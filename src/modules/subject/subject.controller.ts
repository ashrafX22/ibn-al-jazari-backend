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
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from 'src/models/enums/role.enum';

@ApiTags('subject')
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @createSubjectSwaggerDoc()
  @Post()
  async create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectService.create(createSubjectDto);
  }

  @findAllSubjectsSwaggerDoc()
  @Roles(Role.TEACHER)
  @Get()
  async findAll() {
    return this.subjectService.findAll();
  }

  @findOneSubjectSwaggerDoc()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.subjectService.findOne(id);
  }

  @updateSubjectSwaggerDoc()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ) {
    return this.subjectService.update(id, updateSubjectDto);
  }

  @removeSubjectSwaggerDoc()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.subjectService.remove(id);
  }
}
