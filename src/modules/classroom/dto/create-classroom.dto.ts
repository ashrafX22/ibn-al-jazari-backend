import { ApiProperty } from '@nestjs/swagger';

export class CreateClassroomDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  teacherId: number;

  @ApiProperty()
  subjectId: number;

  @ApiProperty()
  startTime: string;

  @ApiProperty()
  endTime: string;
}
