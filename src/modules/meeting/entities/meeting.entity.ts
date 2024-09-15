import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class MeetingEnity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  link: string;

  @ApiProperty()
  classroomId: string;

  // add or exclude or expose properties as needed
  @Exclude()
  meetingProviderId: string;

  constructor(partial: Partial<MeetingEnity>) {
    Object.assign(this, partial);
  }
}
