import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateGoogleMeetDto } from './dto/create-google-meet.dto';

export function createMeetingSwaggerDoc() {
    return applyDecorators(
        ApiOperation({
            summary: "Creates a new Google Meet meeting.",
        }),
        ApiBody({
            description: 'Details of the meeting to be created',
            type: CreateGoogleMeetDto,
        }),
        ApiResponse({
            status: 201,
            description: 'Meeting successfully created',
            type: CreateGoogleMeetDto,
        }),
        ApiResponse({
            status: 401,
            description: 'Unauthorized',
        }),
        ApiResponse({
            status: 400,
            description: 'Bad Request',
        })
    );
}