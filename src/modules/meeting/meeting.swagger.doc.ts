import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { MeetingEnity } from './entities/meeting.entity';
import { MeetingProvider } from './enums/meeting-provider.enum';

export function createMeetingSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new meeting',
      description:
        'This function handles the creation of a new meeting for a given classroom.',
    }),
    ApiParam({
      name: 'classroomId',
      description:
        'The ID of the classroom for which the meeting is being created.',
      example: 1,
    }),
    ApiBody({
      type: CreateMeetingDto,
      description:
        'The DTO containing the necessary information to create a meeting.',
      examples: {
        example1: {
          summary: 'Example meeting creation',
          value: {
            provider: MeetingProvider.GOOGLE,
            title: 'Ijazah Class',
            startTime: '2024-09-10T10:00:00Z',
          } as CreateMeetingDto,
        },
      },
    }),
    ApiResponse({
      status: 201,
      description: 'The newly created meeting entity',
      type: MeetingEnity,
    }),
    ApiResponse({ status: 400, description: 'Invalid input data' }),
    ApiResponse({ status: 404, description: 'Classroom not found' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function findAllMeetingsSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retrieve all meetings',
      description: 'This function returns a list of all meetings.',
    }),
    ApiResponse({
      status: 200,
      description: 'An array of meeting entities',
      type: MeetingEnity,
      isArray: true,
    }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function findMeetingsByTeacherIdSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retrieve meetings by teacher ID',
      description:
        'This function returns all meetings associated with classrooms taught by a specific teacher.',
    }),
    ApiParam({
      name: 'teacherId',
      description: 'The ID of the teacher',
      example: 1,
    }),
    ApiResponse({
      status: 200,
      description: 'An array of meeting entities associated with the teacher',
      type: MeetingEnity,
      isArray: true,
    }),
    ApiResponse({ status: 404, description: 'Teacher not found' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function findMeetingsByStudentIdSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retrieve meetings by student ID',
      description:
        'This function returns all meetings associated with classrooms in which a specific student is enrolled.',
    }),
    ApiParam({
      name: 'studentId',
      description: 'The ID of the student',
      example: 1,
    }),
    ApiResponse({
      status: 200,
      description: 'An array of meeting entities associated with the student',
      type: MeetingEnity,
      isArray: true,
    }),
    ApiResponse({ status: 404, description: 'Student not found' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function findOneMeetingSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retrieve a single meeting by ID',
      description:
        'This function returns a single meeting based on the provided ID.',
    }),
    ApiParam({
      name: 'id',
      description: 'The ID of the meeting to retrieve',
      example: 1,
    }),
    ApiResponse({
      status: 200,
      description: 'The meeting entity',
      type: MeetingEnity,
    }),
    ApiResponse({ status: 404, description: 'Meeting not found' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function updateMeetingSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update a meeting',
      description:
        'This function updates the details of an existing meeting based on the provided ID.',
    }),
    ApiParam({
      name: 'id',
      description: 'The ID of the meeting to update',
      example: 1,
    }),
    ApiBody({
      type: UpdateMeetingDto,
      description:
        'The DTO containing the updated information for the meeting.',
      examples: {
        example1: {
          summary: 'Example meeting update',
          value: {
            startTime: '2024-09-10T11:00:00Z',
          } as UpdateMeetingDto,
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: 'The updated meeting entity',
      type: MeetingEnity,
    }),
    ApiResponse({ status: 400, description: 'Invalid input data' }),
    ApiResponse({ status: 404, description: 'Meeting not found' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function removeMeetingSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete a meeting',
      description: 'This function deletes a meeting based on the provided ID.',
    }),
    ApiParam({
      name: 'id',
      description: 'The ID of the meeting to delete',
      example: 1,
    }),
    ApiResponse({
      status: 204,
      description: 'Meeting successfully deleted',
    }),
    ApiResponse({ status: 404, description: 'Meeting not found' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}
