import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/models/enums/role.enum';
import { CreateStudentDto } from './../../student/dto/create-student.dto';

export class CreateTeacherDto extends CreateStudentDto {
  @ApiProperty()
  @IsString()
  summary: string;

  @ApiProperty()
  @IsEnum(Role)
  proficiency_level: Role;
}
