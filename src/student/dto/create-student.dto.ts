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
  userName: string;

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
  access_token: string = '';

  @ApiProperty()
  refresh_token: string = '';
}
