import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export enum Role {
  ADMIN = 'admin',
  SHEIKH = 'sheikh',
  STUDENT = 'student',
}
export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  role: Role;
}
