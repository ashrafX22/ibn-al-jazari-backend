import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { classroomEntity } from './entities/classroom.entity';

export function createClassroomSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new classroom',
      description: 'This function handles the creation of a new classroom.',
    }),
    ApiBody({
      type: CreateClassroomDto,
      description:
        'The DTO containing the necessary information to create a classroom.',
    }),
    ApiResponse({
      status: 201,
      description: 'The newly created classroom entity',
      type: classroomEntity,
    }),
    ApiResponse({ status: 400, description: 'Invalid input data' }),
    ApiResponse({
      status: 409,
      description: 'Classroom with this name already exists',
    }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function findAllClassroomsSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retrieve all classrooms',
      description: 'This function returns a list of all classrooms.',
    }),
    ApiResponse({
      status: 200,
      description: 'An array of classroom entities',
      type: classroomEntity,
      isArray: true,
    }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function findClassroomsByTeacherIdSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retrieve classrooms by teacher ID',
      description:
        'This function returns all classrooms assigned to a specific teacher.',
    }),
    ApiParam({
      name: 'teacherId',
      description: 'The ID of the teacher',
      example: 1,
    }),
    ApiResponse({
      status: 200,
      description: 'An array of classroom entities assigned to the teacher',
      type: classroomEntity,
      isArray: true,
    }),
    ApiResponse({ status: 404, description: 'Teacher not found' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function findClassroomsByStudentIdSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retrieve classrooms by student ID',
      description:
        'This function returns all classrooms in which a specific student is enrolled.',
    }),
    ApiParam({
      name: 'studentId',
      description: 'The ID of the student',
      example: 1,
    }),
    ApiResponse({
      status: 200,
      description:
        'An array of classroom entities in which the student is enrolled',
      type: classroomEntity,
      isArray: true,
    }),
    ApiResponse({ status: 404, description: 'Student not found' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function findOneClassroomSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retrieve a single classroom by ID',
      description:
        'This function returns a single classroom based on the provided ID.',
    }),
    ApiParam({
      name: 'id',
      description: 'The ID of the classroom to retrieve',
      example: 1,
    }),
    ApiResponse({
      status: 200,
      description: 'The classroom entity',
      type: classroomEntity,
    }),
    ApiResponse({ status: 404, description: 'Classroom not found' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function updateClassroomSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update a classroom',
      description:
        'This function updates the details of an existing classroom based on the provided ID.',
    }),
    ApiParam({
      name: 'id',
      description: 'The ID of the classroom to update',
      example: 1,
    }),
    ApiBody({
      type: UpdateClassroomDto,
      description:
        'The DTO containing the updated information for the classroom.',
      examples: {
        example1: {
          summary: 'Example update',
          value: {
            name: 'Recite',
            description: 'recite classroom',
          } as UpdateClassroomDto,
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: 'The updated classroom entity',
      type: classroomEntity,
    }),
    ApiResponse({ status: 400, description: 'Invalid input data' }),
    ApiResponse({ status: 404, description: 'Classroom not found' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function removeClassroomSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete a classroom',
      description:
        'This function deletes a classroom based on the provided ID.',
    }),
    ApiParam({
      name: 'id',
      description: 'The ID of the classroom to delete',
      example: 1,
    }),
    ApiResponse({
      status: 204,
      description: 'Classroom successfully deleted',
    }),
    ApiResponse({ status: 404, description: 'Classroom not found' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}
