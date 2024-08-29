import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Repository } from 'typeorm';
import { Appointment } from 'src/models/entities/appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>
  ) { }
  create(classroomId: number, createAppointmentDto: CreateAppointmentDto) {
    const appointment = this.appointmentRepository.create({
      classroomId,
      ...createAppointmentDto,
    });

    this.appointmentRepository.save(appointment);

    return appointment;
  }

  findAll() {
    return `This action returns all appointment`;
  }

  findAppointmentsByClassroomId(classroomId: number) {
    return this.appointmentRepository.findBy({ classroomId });
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
