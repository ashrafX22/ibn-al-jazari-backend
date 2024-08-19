import { Exclude } from 'class-transformer';

export class UserEntity {
  username: string;
  name: string;
  email: string;
  dateOfBirth: Date;
  phoneNumber: string;
  gender: string;
  accessToken: string;
  refreshToken: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
