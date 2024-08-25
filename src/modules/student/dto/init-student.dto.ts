import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
} from 'class-validator';

export class InitStudentDto {
    @IsEmail()
    @ApiProperty({
        description: 'The email address of the user',
        example: 'john.doe@example.com',
    })
    email: string;

    @ApiProperty({
        description: 'Access token for the user',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    })
    accessToken: string = '';

    @ApiProperty({
        description: 'Refresh token for the user',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    })
    refreshToken: string = '';
}