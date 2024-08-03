import {
  IsAlpha,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsStrongPassword,
} from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @IsNotEmpty()
  @IsAlpha()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}
