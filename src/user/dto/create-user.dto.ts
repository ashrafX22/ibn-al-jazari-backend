import {
  IsAlpha,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsStrongPassword,
} from 'class-validator';
import { Gender } from 'src/models/enums/gender.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsAlpha()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  // @IsStrongPassword()
  @ApiProperty()
  password?: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsEnum(Gender)
  gender: Gender;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  age: number;

  @ApiProperty()
  access_token: string;

  @ApiProperty()
  refresh_token: string;
}