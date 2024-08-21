import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateStudentDto } from 'src/student/dto/create-student.dto';
import { CreateUserDto } from 'src/user/dto/create.user.dto';

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
        'The user has been authenticated and a session id is successfully created.',
    }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
  );
}

export function googleLoginSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Initiates the login process for Google authentication.',
      description:
        'This endpoint is responsible for initiating the OAuth2 flow with Google. \
            It redirect the user to the Google login page to get Google profile info of the user. \
            It automatically redirects to the google/redirect endpoint.',
    }),
  );
}

export function googleRedirectSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary:
        'Figures out what happens when Google redirects to the backend after a successful authentication.',
      description:
        'Logs the user(teacher or student) in if it exists in the database. Otherwise, saves Google profile info in the session.\
            The frontend should call google/register to complete the registration process of ONLY students.',
    }),
    ApiResponse({
      status: 200,
      description: `Redirects to the frontend URL after successful authentication.`,
      headers: {
        isNew: {
          description:
            'A query parameters that indicates whether the user is new and needs to complete the registration process',
          schema: {
            type: 'boolean',
            example: true,
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
      summary: 'Completes the Google registration process of the student',
    }),
    ApiResponse({
      status: 201,
      description: 'The student has been sucessfuly created',
    }),
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
}

export function getSessionUserSwaggerDoc() {
  return applyDecorators(
    ApiOperation({
      summary: 'Gets the user information stored inside the session',
    }),
    ApiResponse({
      status: 200,
      description: 'Returns the user information stored inside the session',
    }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
  );
}

export function getUserSwaggerDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Gets the authenticated user' }),
    ApiResponse({ status: 200, description: 'Returns the authenticated user' }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
  );
}

export function logoutSwaggerDoc() {
  return applyDecorators(
    ApiOperation({ summary: 'Log out the authenticated user' }),
    ApiResponse({
      status: 302,
      description: 'Redirects to the frontend URL after successful logout',
    }),
    ApiResponse({ status: 401, description: 'Unauthorized' }),
  );
}
