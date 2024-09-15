import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Repository } from 'typeorm';
import { Appointment } from 'src/models/entities/appointment.entity';
import { AppointmentEntity } from './entities/appointment.entity';
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
  ): Promise<AppointmentEntity> {
    try {
      const appointment = this.appointmentRepository.create({
        classroomId,
        ...createAppointmentDto,
      });

      const savedAppointment =
        await this.appointmentRepository.save(appointment);

      return new AppointmentEntity(savedAppointment);
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

  async findAll(): Promise<AppointmentEntity[]> {
    const appointments = await this.appointmentRepository.find();
    return appointments.map(
      (appointment) => new AppointmentEntity(appointment),
    );
  }

  async findAppointmentsByClassroomId(
    classroomId: number,
  ): Promise<AppointmentEntity[]> {
    const appointments = await this.appointmentRepository.findBy({
      classroomId,
    });
    return appointments.map(
      (appointment) => new AppointmentEntity(appointment),
    );
  }

  async findOne(id: number): Promise<AppointmentEntity> {
    const appointment = await this.appointmentRepository.findOneBy({ id });

    if (!appointment) {
      throw new BadRequestException(`Appointment with ID ${id} not found.`);
    }

    return new AppointmentEntity(appointment);
  }

  async update(
    id: number,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<AppointmentEntity> {
    await this.appointmentRepository.update(id, updateAppointmentDto);
    const updatedAppointment = await this.appointmentRepository.findOneBy({
      id,
    });

    if (!updatedAppointment) {
      throw new BadRequestException(`Appointment with ID ${id} not found.`);
    }

    return new AppointmentEntity(updatedAppointment);
  }

  async remove(id: number): Promise<AppointmentEntity> {
    const appointment = await this.appointmentRepository.findOneBy({ id });

    if (!appointment) {
      throw new BadRequestException(`Appointment with ID ${id} not found.`);
    }

    await this.appointmentRepository.delete(id);

    return new AppointmentEntity(appointment);
  }
}
