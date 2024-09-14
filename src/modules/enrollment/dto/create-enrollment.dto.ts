import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsInt, IsNotEmpty, IsString, isAlpha } from 'class-validator';

export class CreateEnrollmentDto {
  @ApiProperty({ description: 'ID of the classroom' })
  @IsNotEmpty()
  @IsString()
  classroomId: string;

  @ApiProperty({ description: 'ID of the student' })
  @IsNotEmpty()
  @IsString()
  studentId: string;
}
