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

@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) { }

  @Post()
  async create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentService.create(createEnrollmentDto);
  }

  @Get()
  async findAll() {
    return this.enrollmentService.findAll();
  }

  @Get('student/:studentId')
  async findStudentEnrollmentsByStudentId(
    @Param('studentId', ParseIntPipe) studentId: number,
  ) {
    return this.enrollmentService.findStudentEnrollmentsByStudentId(+studentId);
  }

  @Get(':classroomId/:studentId')
  findOne(@Param('classroomId') classroomId: string, @Param('studentId') studentId: string) {
    return this.enrollmentService.findOne(+classroomId, +studentId);
  }

  @Patch(':classroomId/:studentId')
  async update(
    @Param('classroomId') classroomId: string, @Param('studentId') studentId: string,
    @Body() updateEnrollmentDto: UpdateEnrollmentDto,
  ) {
    return this.enrollmentService.update(+classroomId, +studentId, updateEnrollmentDto);
  }

  @Delete(':classroomId/:studentId')
  async remove(@Param('classroomId') classroomId: string, @Param('studentId') studentId: string) {
    return this.enrollmentService.remove(+classroomId, +studentId);
  }
}
