import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { SubjectEntity } from './entities/subject.entity';

export function createSubjectSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new subject',
      description: 'This function handles the creation of a new subject.',
    }),
    ApiBody({
      type: CreateSubjectDto,
      description:
        'The DTO containing the necessary information to create a subject.',
      examples: {
        example1: {
          summary: 'Example subject creation',
          value: {
            name: 'Ijazah',
            price: 1000,
          } as CreateSubjectDto,
        },
      },
    }),
    ApiResponse({
      status: 201,
      description: 'The newly created subject entity',
      type: SubjectEntity,
    }),
    ApiResponse({ status: 500, description: 'An unexpected error occurred.' }),
  );
}

export function findAllSubjectsSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retrieve all subjects',
      description: 'This function returns a list of all subjects.',
    }),
    ApiResponse({
      status: 200,
      description: 'An array of subject entities',
      type: SubjectEntity,
      isArray: true,
    }),
    ApiResponse({ status: 500, description: 'An unexpected error occurred.' }),
  );
}

export function findOneSubjectSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Retrieve a single subject by ID',
      description:
        'This function returns a single subject based on the provided ID.',
    }),
    ApiParam({
      name: 'id',
      description: 'The ID of the subject to retrieve',
      example: 1,
    }),
    ApiResponse({
      status: 200,
      description: 'The subject entity',
      type: SubjectEntity,
    }),
    ApiResponse({ status: 500, description: 'Subject not found.' }),
  );
}

export function updateSubjectSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update a subject',
      description:
        'This function updates the details of an existing subject based on the provided ID.',
    }),
    ApiParam({
      name: 'id',
      description: 'The ID of the subject to update',
      example: 1,
    }),
    ApiBody({
      type: UpdateSubjectDto,
      description:
        'The DTO containing the updated information for the subject.',
      examples: {
        example1: {
          summary: 'Example subject update',
          value: {
            name: 'Ijazah',
            price: 4500,
          } as UpdateSubjectDto,
        },
      },
    }),
    ApiResponse({
      status: 200,
      description: 'The updated subject entity',
      type: SubjectEntity,
    }),
    ApiResponse({ status: 500, description: 'Subject not found.' }),
  );
}

export function removeSubjectSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete a subject',
      description: 'This function deletes a subject based on the provided ID.',
    }),
    ApiParam({
      name: 'id',
      description: 'The ID of the subject to delete',
      example: 1,
    }),
    ApiResponse({
      status: 204,
      description: 'Subject successfully deleted',
    }),
    ApiResponse({ status: 500, description: 'Subject not found.' }),
  );
}
