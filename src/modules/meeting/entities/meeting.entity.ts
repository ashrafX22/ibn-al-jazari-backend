import { ApiProperty } from '@nestjs/swagger';

export class MeetingEnity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  link: string;

  @ApiProperty()
  classroomId: string;

  // add or exclude or expose properties as needed

  constructor(partial: Partial<MeetingEnity>) {
    Object.assign(this, partial);
  }
}
