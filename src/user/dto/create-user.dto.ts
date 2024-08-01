import { IsEmail, IsEnum, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsStrongPassword()
  @ApiProperty()
  password: string;

  @IsEnum(Role)
  @IsNotEmpty()
  @ApiProperty()
  role: Role;
}
