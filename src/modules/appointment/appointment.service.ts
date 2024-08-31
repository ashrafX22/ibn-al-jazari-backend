import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Repository } from 'typeorm';
import { Appointment } from 'src/models/entities/appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}
  async create(
    classroomId: number,
    createAppointmentDto: CreateAppointmentDto,
  ) {
    try {
      const appointment = this.appointmentRepository.create({
        classroomId,
        ...createAppointmentDto,
      });

      await this.appointmentRepository.save(appointment);

      return appointment;
    } catch (error) {
      if (error.code === '23505') {
        // Example: handle unique constraint violation
        throw new BadRequestException(
          'Appointment with this time already exists.',
        );
      } else if (error instanceof TypeError) {
        // Handle type errors, if necessary
        throw new BadRequestException('Invalid data provided.');
      } else {
        throw new InternalServerErrorException('An unexpected error occurred.');
      }
    }
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
