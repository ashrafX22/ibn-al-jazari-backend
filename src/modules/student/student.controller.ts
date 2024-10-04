import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  createStudentSwaggerDoc,
  findAllStudentsSwaggerDoc,
  findStudentByIdSwaggerDoc,
  findStudentByEmailSwaggerDoc,
  updateStudentSwaggerDoc,
  removeStudentSwaggerDoc,
} from './student.swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from 'src/models/enums/role.enum';
import { PublicRoute } from '../auth/public-route/public-route.decorator';

@ApiTags('student')
@Controller('student')
@UseInterceptors(ClassSerializerInterceptor)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @createStudentSwaggerDoc()
  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    return await this.studentService.create(createStudentDto);
  }

  @findAllStudentsSwaggerDoc()
  @Roles(Role.TEACHER)
  @Get('teacher/:teacherId')
  async findAll() {
    return await this.studentService.findAll();
  }

  @findStudentByIdSwaggerDoc()
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.studentService.findById(id);
  }

  @findStudentByEmailSwaggerDoc()
  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    return await this.studentService.findByEmail(email);
  }

  @updateStudentSwaggerDoc()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return await this.studentService.update(id, updateStudentDto);
  }

  @removeStudentSwaggerDoc()
  @PublicRoute()
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.studentService.remove(id);
  }
}
