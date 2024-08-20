import { Exclude, Expose } from 'class-transformer';
import { calculateAge } from 'utils/date-utils';

export class UserEntity {
  username: string;
  name: string;
  email: string;
  dateOfBirth: Date;
  phoneNumber: string;
  gender: string;

  @Exclude()
  password: string;
  @Exclude()
  accessToken: string;
  @Exclude()
  refreshToken: string;

  @Expose()
  get age(): number {
    return calculateAge(this.dateOfBirth);
  }

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
