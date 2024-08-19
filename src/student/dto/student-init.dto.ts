import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
} from 'class-validator';

export class StudentInitDto {
    @IsEmail()
    @ApiProperty()
    email: string;

    @ApiProperty()
    accessToken: string = '';

    @ApiProperty()
    refreshToken: string = '';
}