import { ApiProperty } from '@nestjs/swagger';

export class CreateGoogleMeetDto {
    @ApiProperty({
        description: 'Summary of the Google Meet meeting',
        example: 'Project Planning Meeting',
    })
    summary: string;

    @ApiProperty({
        description: 'Description of the Google Meet meeting',
        example: 'Discussing the project plan for Q3',
        required: false,
    })
    description?: string;

    @ApiProperty({
        description: 'Start date and time of the meeting in ISO string format',
        example: '2025-08-07T20:00:00+03:00',
    })
    startDate: string;

    @ApiProperty({
        description: 'End date and time of the meeting in ISO string format',
        example: '2025-08-07T20:30:00+03:00',
    })
    endDate: string;

    @ApiProperty({
        description: 'List of attendees emails',
        example: ['attendee1@example.com', 'attendee2@example.com'],
        type: [String],
    })
    attendees: string[];
}
