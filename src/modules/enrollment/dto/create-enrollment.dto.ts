import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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
