import { ApiProperty } from '@nestjs/swagger';

export class SubjectEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  // add or exclude or expose properties as needed

  constructor(subject: Partial<SubjectEntity>) {
    Object.assign(this, subject);
  }
}
