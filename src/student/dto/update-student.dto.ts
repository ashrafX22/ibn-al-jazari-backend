import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateStudentDto } from './create-student.dto';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  email?: string;
}
