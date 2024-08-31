import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateMeetingDto } from './dto/create-meeting.dto';

export function createMeetingSwaggerDoc() {
    return applyDecorators(
        ApiOperation({
            summary: "Creates a new Google Meet meeting.",
        }),
        ApiBody({
            description: 'Details of the meeting to be created',
            type: CreateMeetingDto,
        }),
        ApiResponse({
            status: 201,
            description: 'Meeting successfully created',
            type: CreateMeetingDto,
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