import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UpdateStudentDto } from './dto/update-student.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentEntity } from './entities/student.entity';

export function createStudentSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new student',
      description:
        'This function handles the creation of a new student with the provided details.',
    }),
    ApiBody({
      type: CreateStudentDto,
      description:
        'The DTO containing the necessary information to create a student.',
    }),
    ApiResponse({
      status: 201,
      description: 'The newly created student entity',
      type: StudentEntity,
    }),
    ApiResponse({ status: 400, description: 'Invalid input data' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function findAllStudentsSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retrieve a list of all students',
      description:
        'This function returns a list of all students registered in the system.',
    }),
    ApiResponse({
      status: 200,
      description: 'A list of students',
      type: [StudentEntity],
    }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function findStudentByIdSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retrieve a student by ID',
      description:
        'This function returns a specific student based on the provided ID.',
    }),
    ApiParam({
      name: 'id',
      type: 'string',
      description: 'The unique identifier of the student',
      example: '1',
    }),
    ApiResponse({
      status: 200,
      description: 'The student object',
      type: StudentEntity,
    }),
    ApiResponse({ status: 404, description: 'student not found' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function findStudentByEmailSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retrieve a student by email',
      description:
        'This function returns a specific student based on the provided email address.',
    }),
    ApiParam({
      name: 'email',
      type: 'string',
      description: 'The email address of the student',
      example: 'student@example.com',
    }),
    ApiResponse({
      status: 200,
      description: 'The student object',
      type: StudentEntity,
    }),
    ApiResponse({ status: 404, description: 'student not found' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function updateStudentSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update a student by ID',
      description:
        'This function updates the details of an existing student based on the provided ID.',
    }),
    ApiParam({
      name: 'id',
      type: 'string',
      description: 'The unique identifier of the student',
      example: '1',
    }),
    ApiBody({
      type: UpdateStudentDto,
      description: 'The DTO object containing the updated student information',
    }),
    ApiResponse({
      status: 200,
      description: 'The updated student object',
      type: StudentEntity,
    }),
    ApiResponse({ status: 400, description: 'Invalid data' }),
    ApiResponse({ status: 404, description: 'student not found' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function removeStudentSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete a student by ID',
      description:
        'This function removes a specific student based on the provided ID.',
    }),
    ApiParam({
      name: 'id',
      type: 'string',
      description: 'The unique identifier of the student',
      example: '1',
    }),
    ApiResponse({
      status: 200,
      description: 'student deleted successfully',
    }),
    ApiResponse({ status: 404, description: 'student not found' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}
