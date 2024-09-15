import { ApiProperty } from '@nestjs/swagger';

export class AppointmentEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  classroomId: number;

  @ApiProperty()
  day: string;

  @ApiProperty()
  startTime: string;

  // add or exclude or expose properties as needed

  constructor(partial: Partial<AppointmentEntity>) {
    Object.assign(this, partial);
  }
}
