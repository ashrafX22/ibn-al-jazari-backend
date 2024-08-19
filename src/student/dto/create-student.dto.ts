import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsAlpha,
  IsEmail,
  IsStrongPassword,
  IsEnum,
  IsNumber,
  IsDate,
} from 'class-validator';
import { Gender } from 'src/models/enums/gender.enum';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsAlpha()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @IsAlpha()
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

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

  @ApiProperty()
  accessToken: string = '';

  @ApiProperty()
  refreshRoken: string = '';
}
