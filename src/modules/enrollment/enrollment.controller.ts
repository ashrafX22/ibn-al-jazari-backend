import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
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

@ApiTags('enrollment')
@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post()
  @createEnrollmentSwaggerDoc()
  async create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentService.create(createEnrollmentDto);
  }

  @Get()
  @findAllEnrollmentsSwaggerDoc()
  async findAll() {
    return this.enrollmentService.findAll();
  }

  @Get('student/:studentId')
  @findEnrollmentsByStudentIdSwaggerDoc()
  async findStudentEnrollmentsByStudentId(
    @Param('studentId', ParseIntPipe) studentId: number,
  ) {
    return this.enrollmentService.findEnrollmentsByStudentId(+studentId);
  }

  @Get(':classroomId/:studentId')
  @findOneEnrollmentSwaggerDoc()
  findOne(
    @Param('classroomId') classroomId: string,
    @Param('studentId') studentId: string,
  ) {
    return this.enrollmentService.findOne(+classroomId, +studentId);
  }

  @Patch(':classroomId/:studentId')
  @updateEnrollmentSwaggerDoc()
  async update(
    @Param('classroomId') classroomId: string,
    @Param('studentId') studentId: string,
    @Body() updateEnrollmentDto: UpdateEnrollmentDto,
  ) {
    return this.enrollmentService.update(
      +classroomId,
      +studentId,
      updateEnrollmentDto,
    );
  }

  @Delete(':classroomId/:studentId')
  @removeEnrollmentSwaggerDoc()
  async remove(
    @Param('classroomId') classroomId: string,
    @Param('studentId') studentId: string,
  ) {
    return this.enrollmentService.remove(+classroomId, +studentId);
  }
}
