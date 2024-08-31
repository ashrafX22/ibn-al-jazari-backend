import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateClassroomDto {
  @ApiProperty({ description: 'Name of the classroom' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'ID of the teacher' })
  @IsInt()
  @IsNotEmpty()
  teacherId: number;

  @ApiProperty({ description: 'ID of the subject' })
  @IsInt()
  @IsNotEmpty()
  subjectId: number;

  @ApiProperty({ description: 'Start time of the class (ISO 8601 format)' })
  @IsDateString()
  @IsNotEmpty()
  startTime: string;

  @ApiProperty({ description: 'End time of the class (ISO 8601 format)' })
  @IsDateString()
  @IsNotEmpty()
  endTime: string;
}
