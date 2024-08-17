import {
    IsAlpha,
    IsDate,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsStrongPassword,
} from 'class-validator';
import { Gender, Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeacherDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsAlpha()
    name: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsStrongPassword()
    password?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(Gender)
    gender: Gender;

    @ApiProperty()
    age: number;

    @ApiProperty()
    summary: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(Role)
    proficiency_level: Role;

    @ApiProperty()
    access_token: string;

    @ApiProperty()
    refresh_token: string;
}
