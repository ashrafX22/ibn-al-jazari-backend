import { Exclude } from 'class-transformer';
import { Role } from '@prisma/client';

export class UserEntity {
  name: string;
  email: string;
  role: Role;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
