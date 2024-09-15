import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { TeacherEntity } from './entities/teacher.entity';

export function createTeacherSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new teacher',
      description:
        'This function handles the creation of a new teacher with the provided details.',
    }),
    ApiBody({
      type: CreateTeacherDto,
      description:
        'The DTO containing the necessary information to create a teacher.',
    }),
    ApiResponse({
      status: 201,
      description: 'The newly created teacher entity',
      type: TeacherEntity,
    }),
    ApiResponse({ status: 400, description: 'Invalid input data' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function findAllTeachersSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retrieve a list of all teachers',
      description:
        'This function returns a list of all teachers registered in the system.',
    }),
    ApiResponse({
      status: 200,
      description: 'A list of teachers',
      type: [TeacherEntity],
    }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function findTeacherByIdSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retrieve a teacher by ID',
      description:
        'This function returns a specific teacher based on the provided ID.',
    }),
    ApiParam({
      name: 'id',
      type: 'string',
      description: 'The unique identifier of the teacher',
      example: '1',
    }),
    ApiResponse({
      status: 200,
      description: 'The teacher object',
      type: TeacherEntity,
    }),
    ApiResponse({ status: 404, description: 'Teacher not found' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function findTeacherByEmailSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retrieve a teacher by email',
      description:
        'This function returns a specific teacher based on the provided email address.',
    }),
    ApiParam({
      name: 'email',
      type: 'string',
      description: 'The email address of the teacher',
      example: 'teacher@example.com',
    }),
    ApiResponse({
      status: 200,
      description: 'The teacher object',
      type: TeacherEntity,
    }),
    ApiResponse({ status: 404, description: 'Teacher not found' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function updateTeacherSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update a teacher by ID',
      description:
        'This function updates the details of an existing teacher based on the provided ID.',
    }),
    ApiParam({
      name: 'id',
      type: 'string',
      description: 'The unique identifier of the teacher',
      example: '1',
    }),
    ApiBody({
      type: UpdateTeacherDto,
      description: 'The DTO object containing the updated teacher information',
    }),
    ApiResponse({
      status: 200,
      description: 'The updated teacher object',
      type: TeacherEntity,
    }),
    ApiResponse({ status: 400, description: 'Invalid data' }),
    ApiResponse({ status: 404, description: 'Teacher not found' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function removeTeacherSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete a teacher by ID',
      description:
        'This function removes a specific teacher based on the provided ID.',
    }),
    ApiParam({
      name: 'id',
      type: 'string',
      description: 'The unique identifier of the teacher',
      example: '1',
    }),
    ApiResponse({
      status: 200,
      description: 'Teacher deleted successfully',
    }),
    ApiResponse({ status: 404, description: 'Teacher not found' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}
