import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { CreateStudentDto } from 'src/modules/student/dto/create-student.dto';
import { CreateUserDto } from 'src/modules/user/dto/create.user.dto';

export function LocalRegisterSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Registers a new student using local authentication.',
      description:
        'This function is responsible for handling the registration process for new students using local authentication. \
            Local authentication means using `username` and `password`.',
    }),
    ApiBody({
      type: CreateStudentDto,
      description:
        'The DTO object containing the student information for registration.',
    }),
    ApiResponse({
      status: 201,
      description: 'The newly registered student object.',
    }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function localLoginSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Logs a user(teacher or student) in using local authentication.',
      description:
        'This function is responsible for handling the login process for users using local authentication. \
            Local authentication means using `username` and `password`.',
    }),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          username: {
            type: 'string',
            description:
              '**WARNING**: name inconsistency. pass the `email` of the user.',
            example: 'test@example.com',
          },
          password: {
            type: 'string',
            description: 'the *HASHED* user password',
          },
        },
        required: ['username', 'password'],
      },
    }),
    ApiResponse({
      status: 201,
      description:
        'The JWT token has been successfully created and returned.',
    }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
    ApiResponse({ status: 404, description: 'User not found' }),
  );
}

export function googleAuthSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Initiates the login process for Google authentication.',
      description:
        'This endpoint is responsible for initiating the OAuth2 flow with Google. \
            It redirect the user to the Google login page to get Google profile info of the user. \
            It automatically redirects to the google/callback endpoint.',
    }),
    ApiResponse({
      status: 302,
      description: `Redirects to the google/callback endpoint.`,
      headers: {
        location: {
          description: 'google/callback endpoint',
          example: '/api/auth/google/callback'
        },
      },
    }),
  );
}

export function googleAuthCallbackSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary:
        'Figures out what happens when Google redirects to the backend after a successful authentication.',
      description:
        'Logs the user(teacher or student) in if it exists in the database. Otherwise, returns Google profile info.\
            The frontend should call google/register with the complete info to register ONLY students.',
    }),
    ApiResponse({
      status: 301,
      description: `If the user exists in the database, redirects to teacher home page or student home page after successful authentication.`,
      headers: {
        location: {
          description: 'teacher home page or student home page with a jwt token as a query parameter',
          schema: {
            type: 'string',
            example: '/teacher-home?jwt=ey...',
          },
        },
      },
    }),
    ApiResponse({
      status: 302,
      description: `If the user is new, redirects to the additional info page after successful authentication.`,
      headers: {
        location: {
          description: 'teacher home page or student home page with with google info as query parameters',
          schema: {
            type: 'string',
            example: '/additional-info?email=test@example.com&googleAccessToken=...&googleRefreshToken=...',
          },
        },
      },
    }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
  );
}

export function googleRegisterSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Handles Google registration process of a student',
    }),
    ApiResponse({
      status: 302,
      description: `Redirects to the student home page after successful registration.`,
      headers: {
        location: {
          description: 'student home page with a jwt token as a query parameter',
          schema: {
            type: 'string',
            example: '/student-home?jwt=ey...',
          },
        },
      },
    }),
    ApiResponse({ status: 400, description: 'Bad Request' }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function getUserSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'returns the authenticated user information extracted from JWT',
      description: '`requires a JWT token in the Authorization header`',
    }),
    ApiBearerAuth('JWT'),
    ApiResponse({ status: 200, description: 'authenticated user information extracted from JWT' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
  );
}