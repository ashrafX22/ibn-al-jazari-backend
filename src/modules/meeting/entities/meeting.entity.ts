import { ApiProperty } from '@nestjs/swagger';

export class MeetingEnity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  link: string;

  @ApiProperty()
  classroomId: number;

  // add or exclude or expose properties as needed

  constructor(partial: Partial<MeetingEnity>) {
    Object.assign(this, partial);
  }
}
