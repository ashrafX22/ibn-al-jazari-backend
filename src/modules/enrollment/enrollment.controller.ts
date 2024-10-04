import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  createEnrollmentSwaggerDoc,
  findAllEnrollmentsSwaggerDoc,
  findEnrollmentsByStudentIdSwaggerDoc,
  findOneEnrollmentSwaggerDoc,
  removeEnrollmentSwaggerDoc,
  updateEnrollmentSwaggerDoc,
} from './enrollment.swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from 'src/models/enums/role.enum';

@ApiTags('enrollment')
@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @createEnrollmentSwaggerDoc()
  @Roles(Role.TEACHER, Role.STUDENT)
  @Post(':classroomId/:studentId')
  async create(
    @Param('classroomId') classroomId: string,
    @Param('studentId') studentId: string,
  ) {
    return this.enrollmentService.create(classroomId, studentId);
  }

  @findAllEnrollmentsSwaggerDoc()
  @Get()
  async findAll() {
    return this.enrollmentService.findAll();
  }

  @findEnrollmentsByStudentIdSwaggerDoc()
  @Get('student/:studentId')
  async findEnrollmentsByStudentId(@Param('studentId') studentId: string) {
    return this.enrollmentService.findEnrollmentsByStudentId(studentId);
  }

  @findOneEnrollmentSwaggerDoc()
  @Get(':classroomId/:studentId')
  findOne(
    @Param('classroomId') classroomId: string,
    @Param('studentId') studentId: string,
  ) {
    return this.enrollmentService.findOne(classroomId, studentId);
  }

  @updateEnrollmentSwaggerDoc()
  @Patch(':classroomId/:studentId')
  async update(
    @Param('classroomId') classroomId: string,
    @Param('studentId') studentId: string,
    @Body() updateEnrollmentDto: UpdateEnrollmentDto,
  ) {
    return this.enrollmentService.update(
      classroomId,
      studentId,
      updateEnrollmentDto,
    );
  }

  @removeEnrollmentSwaggerDoc()
  @Delete(':classroomId/:studentId')
  async remove(
    @Param('classroomId') classroomId: string,
    @Param('studentId') studentId: string,
  ) {
    return this.enrollmentService.remove(classroomId, studentId);
  }
}
