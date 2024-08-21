import { Exclude, Expose } from 'class-transformer';
import { calculateAge } from 'src/shared/utils/calculate-age.util';

export class UserEntity {
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
