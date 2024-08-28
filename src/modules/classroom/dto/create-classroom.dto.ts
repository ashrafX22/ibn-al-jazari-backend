import { ApiProperty } from '@nestjs/swagger';

export class CreateClassroomDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  teacher_id: number;

  @ApiProperty()
  subject_id: number;

  @ApiProperty()
  startTime: string;

  @ApiProperty()
  endTime: string;
}
