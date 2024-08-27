import { ApiProperty } from '@nestjs/swagger';

export class CreateClassroomDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  teacher_id: number;

  @ApiProperty()
  subject_id: number;

  @ApiProperty()
  start_time: Date;

  @ApiProperty()
  end_time: Date;
}
