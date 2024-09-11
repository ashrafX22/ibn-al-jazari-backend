import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsInt, IsNotEmpty, isAlpha } from 'class-validator';

export class CreateEnrollmentDto {
  @ApiProperty({ description: 'ID of the classroom' })
  @IsNotEmpty()
  @IsAlpha()
  classroomId: string;

  @ApiProperty({ description: 'ID of the student' })
  @IsNotEmpty()
  @IsAlpha()
  studentId: string;
}
