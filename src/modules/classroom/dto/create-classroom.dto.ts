import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateClassroomDto {
  @ApiProperty({ description: 'Name of the classroom' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  name: string;

  @ApiProperty({ description: 'ID of the teacher' })
  @IsString()
  @IsNotEmpty()
  teacherId: string;

  @ApiProperty({ description: 'ID of the subject' })
  @IsString()
  @IsNotEmpty()
  subjectId: string;
}
