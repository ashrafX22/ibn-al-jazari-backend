import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { calculateAge } from 'src/shared/utils/calculate-age.util';

export class SuperUserEntity {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  dateOfBirth: Date;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  profilePicture: string;

  @Exclude()
  password: string;

  @Exclude()
  googleRefreshToken: string;

  @ApiProperty()
  @Expose()
  get age(): number {
    return calculateAge(this.dateOfBirth);
  }

  constructor(partial: Partial<SuperUserEntity>) {
    Object.assign(this, partial);
  }
}
