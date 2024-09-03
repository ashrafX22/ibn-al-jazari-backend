import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { EnrollmentEntity } from './entities/enrollment.entity';

export function createEnrollmentSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new enrollment',
      description: 'This function handles the creation of a new enrollment for a student in a classroom.',
    }),
    ApiBody({
      type: CreateEnrollmentDto,
      description: 'The DTO containing the necessary information to create an enrollment.',
      examples: {
        example1: {
          summary: 'Example enrollment creation',
          value: {
            studentId: 1,
            classroomId: 101,
          } as CreateEnrollmentDto,
        },
      },
    }),
    ApiResponse({
      status: 201,
      description: 'The newly created enrollment entity',
      type: EnrollmentEntity,
    }),
    ApiResponse({ status: 400, description: 'Invalid input data' }),
    ApiResponse({
      status: 409,
      description: 'You are already enrolled in this classroom',
    }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function findAllEnrollmentsSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retrieve all enrollments',
      description: 'This function returns a list of all enrollments.',
    }),
    ApiResponse({
      status: 200,
      description: 'An array of enrollment entities',
      type: EnrollmentEntity,
      isArray: true,
    }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function findStudentEmailsByClassroomIdSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retrieve student emails by classroom ID',
      description: 'This function returns a list of student emails enrolled in a specific classroom.',
    }),
    ApiParam({
      name: 'classroomId',
      description: 'The ID of the classroom',
      example: 101,
    }),
    ApiResponse({
      status: 200,
      description: 'An array of student emails',
      type: String,
      isArray: true,
    }),
    ApiResponse({ status: 404, description: 'Classroom not found' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function findEnrollmentsByStudentIdSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retrieve enrollments by student ID',
      description: 'This function returns all enrollments associated with a specific student.',
    }),
    ApiParam({
      name: 'studentId',
      description: 'The ID of the student',
      example: 1,
    }),
    ApiResponse({
      status: 200,
      description: 'An array of enrollment entities associated with the student',
      type: EnrollmentEntity,
      isArray: true,
    }),
    ApiResponse({ status: 404, description: 'Student not found' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function findOneEnrollmentSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retrieve a single enrollment by student ID and classroom ID',
      description: 'This function returns a single enrollment based on the provided student ID and classroom ID.',
    }),
    ApiParam({
      name: 'studentId',
      description: 'The ID of the student',
      example: 1,
    }),
    ApiParam({
      name: 'classroomId',
      description: 'The ID of the classroom',
      example: 101,
    }),
    ApiResponse({
      status: 200,
      description: 'The enrollment entity',
      type: EnrollmentEntity,
    }),
    ApiResponse({ status: 404, description: 'Enrollment not found' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function updateEnrollmentSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update an enrollment',
      description: 'This function updates the details of an existing enrollment based on the provided student ID and classroom ID.',
    }),
    ApiParam({
      name: 'studentId',
      description: 'The ID of the student',
      example: 1,
    }),
    ApiParam({
      name: 'classroomId',
      description: 'The ID of the classroom',
      example: 101,
    }),
    ApiBody({
      type: UpdateEnrollmentDto,
      description: 'The DTO containing the updated information for the enrollment.',
      examples: {
        example1: {
          summary: 'Example enrollment update',
          value: {
            status: 'active',
          } as UpdateEnrollmentDto,
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: 'The updated enrollment entity',
      type: EnrollmentEntity,
    }),
    ApiResponse({ status: 400, description: 'Invalid input data' }),
    ApiResponse({ status: 404, description: 'Enrollment not found' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function removeEnrollmentSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete an enrollment',
      description: 'This function deletes an enrollment based on the provided student ID and classroom ID.',
    }),
    ApiParam({
      name: 'studentId',
      description: 'The ID of the student',
      example: 1,
    }),
    ApiParam({
      name: 'classroomId',
      description: 'The ID of the classroom',
      example: 101,
    }),
    ApiResponse({
      status: 204,
      description: 'Enrollment successfully deleted',
    }),
    ApiResponse({ status: 404, description: 'Enrollment not found' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}
