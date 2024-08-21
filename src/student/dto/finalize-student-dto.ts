import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsAlpha,
    IsStrongPassword,
    IsEnum,
    IsDate,
} from 'class-validator';
import { Gender } from 'src/models/enums/gender.enum';

export class FinalizeStudentDto {
    @IsNotEmpty()
    @IsAlpha()
    @ApiProperty()
    username: string;

    @IsNotEmpty()
    @IsAlpha()
    @ApiProperty()
    name: string;

    @IsStrongPassword()
    @ApiProperty()
    password?: string = 'google';

    @IsNotEmpty()
    @IsEnum(Gender)
    @ApiProperty()
    gender: Gender;

    @IsNotEmpty()
    @ApiProperty()
    phoneNumber: string;

    @IsNotEmpty()
    @IsDate()
    @ApiProperty()
    dateOfBirth: Date;
}