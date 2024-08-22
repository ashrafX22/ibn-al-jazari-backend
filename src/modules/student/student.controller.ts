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
} from './student.swagger-doc';

@ApiTags('student')
@Controller('student')
@UseInterceptors(ClassSerializerInterceptor)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @createStudentSwaggerDoc()
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @findAllStudentsSwaggerDoc()
  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @findStudentByIdSwaggerDoc()
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.studentService.findById(+id);
  }

  @findStudentByEmailSwaggerDoc()
  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.studentService.findByEmail(email);
  }

  @updateStudentSwaggerDoc()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }

  @removeStudentSwaggerDoc()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
