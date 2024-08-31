import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateEnrollmentDto {
  @ApiProperty({ description: 'ID of the classroom' })
  @IsInt()
  @IsNotEmpty()
  classroomId: number;

  @ApiProperty({ description: 'ID of the student' })
  @IsInt()
  @IsNotEmpty()
  studentId: number;
}
