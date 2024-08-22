import { ApiProperty } from '@nestjs/swagger';
import {
    IsEnum,
    IsDateString,
    IsPhoneNumber,
    IsString,
} from 'class-validator';
import { Gender } from 'src/models/enums/gender.enum';

export class FinalizeStudentDto {
    @IsString()
    @ApiProperty({
        description: 'The full name of the user',
        example: 'John Doe',
    })
    name: string;

    @IsEnum(Gender)
    @ApiProperty({
        description: 'The gender of the user',
        example: 'MALE',
    })
    gender: Gender;

    @IsPhoneNumber()
    @ApiProperty({
        description: 'The phone number of the user',
        example: '+1234567890',
    })
    phoneNumber: string;

    @IsDateString()
    @ApiProperty({
        description: 'The date of birth of the user',
        example: '1990-01-01',
    })
    dateOfBirth: Date;
}