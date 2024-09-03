import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  createAppointmentSwaggerDoc,
  findAllAppointmentsSwaggerDoc,
  findOneAppointmentSwaggerDoc,
  updateAppointmentSwaggerDoc,
} from './appointment.swagger.docs';

@ApiTags('appointment')
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post(':classroomId')
  @createAppointmentSwaggerDoc()
  async create(
    @Param('classroomId') classroomId: string,
    @Body() createAppointmentDto: CreateAppointmentDto,
  ) {
    return this.appointmentService.create(+classroomId, createAppointmentDto);
  }

  @Get()
  @findAllAppointmentsSwaggerDoc()
  async findAll() {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  @findOneAppointmentSwaggerDoc()
  async findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(+id);
  }

  @Patch(':id')
  @updateAppointmentSwaggerDoc()
  async update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentService.update(+id, updateAppointmentDto);
  }

  @Delete(':id')
  @createAppointmentSwaggerDoc()
  async remove(@Param('id') id: string) {
    return this.appointmentService.remove(+id);
  }
}
