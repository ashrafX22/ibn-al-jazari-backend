import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  createClassroomSwaggerDoc,
  findAllClassroomsSwaggerDoc,
  findClassroomsByStudentIdSwaggerDoc,
  findClassroomsByTeacherIdSwaggerDoc,
  findOneClassroomSwaggerDoc,
  updateClassroomSwaggerDoc,
} from './classroom.swagger';

@ApiTags('classroom')
@Controller('classroom')
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) {}

  @Post()
  @createClassroomSwaggerDoc()
  async create(@Body() createClassroomDto: CreateClassroomDto) {
    return this.classroomService.create(createClassroomDto);
  }

  @Get()
  @findAllClassroomsSwaggerDoc()
  async findAll() {
    return this.classroomService.findAll();
  }

  @Get('teacher/:teacherId')
  @findClassroomsByTeacherIdSwaggerDoc()
  async getClassroomsByTeacherId(@Param('teacherId') teacherId: string) {
    return this.classroomService.findClassroomsByTeacherId(+teacherId);
  }

  @Get('student/:studentId')
  @findClassroomsByStudentIdSwaggerDoc()
  async getClassroomsByStudentId(@Param('studentId') studentId: string) {
    return this.classroomService.findClassroomsByStudentId(+studentId);
  }

  @Get(':id')
  @findOneClassroomSwaggerDoc()
  async findOne(@Param('id') id: string) {
    return this.classroomService.findOne(+id);
  }

  @Patch(':id')
  @updateClassroomSwaggerDoc()
  async update(
    @Param('id') id: string,
    @Body() updateClassroomDto: UpdateClassroomDto,
  ) {
    return this.classroomService.update(+id, updateClassroomDto);
  }

  @Delete(':id')
  @createClassroomSwaggerDoc()
  async remove(@Param('id') id: string) {
    return this.classroomService.remove(+id);
  }
}
