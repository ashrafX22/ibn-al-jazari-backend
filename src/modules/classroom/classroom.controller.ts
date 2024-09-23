import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseInterceptors,
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
  removeClassroomSwaggerDoc,
  updateClassroomSwaggerDoc,
} from './classroom.swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from 'src/models/enums/role.enum';
import { CreateAppointmentDto } from '../appointment/dto/create-appointment.dto';
import { GoogleTokenInterceptor } from '../auth/providers/google/google-token.interceptor';

@ApiTags('classroom')
@Controller('classroom')
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) {}

  @createClassroomSwaggerDoc()
  @Roles(Role.TEACHER)
  @Post('teacher/:teacherId')
  async create(
    @Param('teacherId') teacherId: string,
    @Body() createClassroomDto: CreateClassroomDto,
  ) {
    return await this.classroomService.create(teacherId, createClassroomDto);
  }

  @findAllClassroomsSwaggerDoc()
  @Get()
  async findAll() {
    return await this.classroomService.findAll();
  }

  @Roles(Role.STUDENT)
  @Get('joinable')
  async findJoinableClassrooms(@Req() req) {
    console.log('findJoinableClassrooms user', req.user);
    return await this.classroomService.findJoinableClassrooms(req.user.id);
  }

  @findOneClassroomSwaggerDoc()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.classroomService.findOne(id);
  }

  @Roles(Role.TEACHER, Role.STUDENT)
  @Get('details/:id')
  async findClassroomDetails(@Param('id') id: string) {
    return await this.classroomService.findClassroomDetails(id);
  }

  @Roles(Role.TEACHER)
  @Get('teacher/:teacherId/lessons')
  async findWeeklyLessonsByTeacherId(@Param('teacherId') teacherId: string) {
    return await this.classroomService.findWeeklyLessonsByTeacherId(teacherId);
  }

  @Roles(Role.STUDENT)
  @Get('student/:studentId/lessons')
  async findWeeklyLessonsByStudentId(@Param('studentId') studentId: string) {
    return await this.classroomService.findWeeklyLessonsByStudentId(studentId);
  }

  @findClassroomsByTeacherIdSwaggerDoc()
  @Roles(Role.TEACHER)
  @Get('teacher/:teacherId')
  async findClassroomsByTeacherId(@Param('teacherId') teacherId: string) {
    return await this.classroomService.findClassroomsByTeacherId(teacherId);
  }

  @findClassroomsByStudentIdSwaggerDoc()
  @Roles(Role.STUDENT)
  @Get('student/:studentId')
  async findClassroomsByStudentId(@Param('studentId') studentId: string) {
    return await this.classroomService.findClassroomsByStudentId(studentId);
  }

  @Roles(Role.TEACHER)
  @UseInterceptors(GoogleTokenInterceptor)
  @Post(':classroomId/appointments/edit')
  async editAppointments(
    @Req() req,
    @Param('classroomId') classroomId: string,
    @Body() createAppointmentDtos: CreateAppointmentDto[],
  ) {
    console.log(
      'editAppointments',
      req.user,
      classroomId,
      createAppointmentDtos,
    );
    await this.classroomService.editAppointments(
      req.user,
      classroomId,
      createAppointmentDtos,
    );
    return { message: 'success' };
  }

  @updateClassroomSwaggerDoc()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClassroomDto: UpdateClassroomDto,
  ) {
    return await this.classroomService.update(id, updateClassroomDto);
  }

  @Delete(':id')
  @removeClassroomSwaggerDoc()
  async remove(@Param('id') id: string) {
    return await this.classroomService.remove(id);
  }
}
