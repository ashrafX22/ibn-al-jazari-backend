import {
  IsAlpha,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Gender } from 'src/models/enums/gender.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/models/enums/role.enum';

export class CreateTeacherDto {
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
  access_token: string;

  @ApiProperty()
  refresh_token: string;

  @IsString()
  summary: string;

  @IsEnum(Role)
  proficiency_level: Role;
}
