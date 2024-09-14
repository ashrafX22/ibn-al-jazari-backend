import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  createTeacherSwaggerDoc,
  findAllTeachersSwaggerDoc,
  findTeacherByEmailSwaggerDoc,
  findTeacherByIdSwaggerDoc,
  removeTeacherSwaggerDoc,
  updateTeacherSwaggerDoc,
} from './teacher.swagger';

@ApiTags('teacher')
@Controller('teacher')
@UseInterceptors(ClassSerializerInterceptor)
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) { }

  @createTeacherSwaggerDoc()
  @Post()
  async create(@Body() createTeacherDto: CreateTeacherDto) {
    return await this.teacherService.create(createTeacherDto);
  }

  @findAllTeachersSwaggerDoc()
  @Get()
  async findAll() {
    return await this.teacherService.findAll();
  }

  @findTeacherByIdSwaggerDoc()
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.teacherService.findById(id);
  }

  @findTeacherByEmailSwaggerDoc()
  @Get('email/:email')
  async findOneByEmail(@Param('email') email: string) {
    return await this.teacherService.findByEmail(email);
  }

  @updateTeacherSwaggerDoc()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ) {
    return await this.teacherService.update(id, updateTeacherDto);
  }

  @Patch(':id')
  async approve(@Param('id') id: string) {
    return await this.teacherService.approve(id);
  }

  @removeTeacherSwaggerDoc()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.teacherService.remove(id);
  }
}
