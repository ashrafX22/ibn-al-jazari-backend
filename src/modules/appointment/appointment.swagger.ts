import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AppointmentEntity } from './entities/appointment.entity';
import { Day } from 'src/models/enums/day.enum';

export function createAppointmentSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new appointment',
      description:
        'This function handles the creation of a new appointment for a given classroom.',
    }),
    ApiParam({
      name: 'classroomId',
      description:
        'The ID of the classroom for which the appointment is being created.',
      example: '1',
    }),
    ApiBody({
      type: CreateAppointmentDto,
      description:
        'The DTO containing the necessary information to create an appointment.',
      examples: {
        example1: {
          summary: 'Example appointment',
          value: {
            day: Day.FRIDAY,
            startTime: '10:00 AM',
          } as CreateAppointmentDto,
        },
      },
    }),
    ApiResponse({
      status: 201,
      description: 'The newly created appointment entity',
      type: AppointmentEntity,
    }),
    ApiResponse({ status: 400, description: 'Invalid input data' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function findAllAppointmentsSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retrieve all appointments',
      description: 'This function returns a list of all appointments.',
    }),
    ApiResponse({
      status: 200,
      description: 'An array of appointment entities',
      type: AppointmentEntity,
      isArray: true,
    }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function findOneAppointmentSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retrieve a single appointment by ID',
      description:
        'This function returns a single appointment based on the provided ID.',
    }),
    ApiParam({
      name: 'id',
      description: 'The ID of the appointment to retrieve.',
      example: '1',
    }),
    ApiResponse({
      status: 200,
      description: 'The appointment entity',
      type: AppointmentEntity,
    }),
    ApiResponse({ status: 404, description: 'Appointment not found' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function updateAppointmentSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update an appointment',
      description:
        'This function updates the details of an existing appointment based on the provided ID.',
    }),
    ApiParam({
      name: 'id',
      description: 'The ID of the appointment to update.',
      example: '1',
    }),
    ApiBody({
      type: UpdateAppointmentDto,
      description:
        'The DTO containing the updated information for the appointment.',
      examples: {
        example1: {
          summary: 'Example update',
          value: {
            day: Day.FRIDAY,
            startTime: '11:00 AM',
          } as UpdateAppointmentDto,
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: 'The updated appointment entity',
      type: AppointmentEntity,
    }),
    ApiResponse({ status: 400, description: 'Invalid input data' }),
    ApiResponse({ status: 404, description: 'Appointment not found' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function removeAppointmentSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete an appointment',
      description:
        'This function deletes an appointment based on the provided ID.',
    }),
    ApiParam({
      name: 'id',
      description: 'The ID of the appointment to delete.',
      example: '1',
    }),
    ApiResponse({
      status: 204,
      description: 'Appointment successfully deleted',
    }),
    ApiResponse({ status: 404, description: 'Appointment not found' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}
