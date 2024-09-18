import { ApiProperty } from '@nestjs/swagger';
import { Day } from 'src/models/enums/day.enum';

export class AppointmentEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  classroomId: string;

  @ApiProperty()
  day: Day;

  @ApiProperty()
  startTime: string;

  // add or exclude or expose properties as needed

  constructor(partial: Partial<AppointmentEntity>) {
    Object.assign(this, partial);
  }
}
