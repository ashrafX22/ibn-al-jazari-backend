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

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsAlpha()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsStrongPassword()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  age: number;

  @ApiProperty()
  access_token: string;

  @ApiProperty()
  refresh_token: string;
}
