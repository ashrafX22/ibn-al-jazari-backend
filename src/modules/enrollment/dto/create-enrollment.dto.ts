import { ApiProperty } from '@nestjs/swagger';

export class CreateEnrollmentDto {
  @ApiProperty()
  classroomId: number;

  @ApiProperty()
  studentId: number;

  @ApiProperty()
  timestamp: Date;
}
