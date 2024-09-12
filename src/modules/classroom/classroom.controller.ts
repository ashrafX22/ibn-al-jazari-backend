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
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from 'src/models/enums/role.enum';

@ApiTags('classroom')
@Controller('classroom')
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) { }

  @createClassroomSwaggerDoc()
  @Roles(Role.TEACHER)
  @Post()
  async create(@Body() createClassroomDto: CreateClassroomDto) {
    return this.classroomService.create(createClassroomDto);
  }

  @findAllClassroomsSwaggerDoc()
  @Get()
  async findAll() {
    return this.classroomService.findAll();
  }

  @findOneClassroomSwaggerDoc()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.classroomService.findOne(id);
  }

  @Roles(Role.TEACHER, Role.STUDENT)
  @Get('details/:id')
  async findClassroomDetails(@Param('id') id: string) {
    return this.classroomService.findClassroomDetails(id);
  }

  @Roles(Role.TEACHER)
  @Get('teacher/:teacherId/lessons')
  async findLessonsByTeacherId(@Param('teacherId') teacherId: string) {
    return this.classroomService.findLessonsByTeacherId(teacherId);
  }

  @Roles(Role.STUDENT)
  @Get('student/:studentId/lessons')
  async findLessonsByStudentId(@Param('studentId') studentId: string) {
    return this.classroomService.findLessonsByStudentId(studentId);
  }

  @findClassroomsByTeacherIdSwaggerDoc()
  @Roles(Role.TEACHER)
  @Get('teacher/:teacherId')
  async getClassroomsByTeacherId(@Param('teacherId') teacherId: string) {
    return this.classroomService.findClassroomsByTeacherId(teacherId);
  }

  @findClassroomsByStudentIdSwaggerDoc()
  @Roles(Role.STUDENT)
  @Get('student/:studentId')
  async getClassroomsByStudentId(@Param('studentId') studentId: string) {
    return this.classroomService.findClassroomsByStudentId(studentId);
  }

  @updateClassroomSwaggerDoc()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClassroomDto: UpdateClassroomDto,
  ) {
    return this.classroomService.update(id, updateClassroomDto);
  }

  @createClassroomSwaggerDoc()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.classroomService.remove(id);
  }
}
