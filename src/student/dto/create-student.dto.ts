import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsAlpha,
  IsEmail,
  IsStrongPassword,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { Gender } from 'src/models/enums/gender.enum';

export class CreateStudentDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsAlpha()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsStrongPassword()
  @ApiProperty()
  password?: string = 'google';

  @IsNotEmpty()
  @ApiProperty()
  @IsEnum(Gender)
  gender: Gender;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  age: number;

  @ApiProperty()
  access_token: string = '';

  @ApiProperty()
  refresh_token: string = '';
}
