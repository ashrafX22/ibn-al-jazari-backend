import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Experience } from 'src/models/enums/experience.enum';
import { CreateUserDto } from './../../user/dto/create.user.dto';

export class CreateTeacherDto extends CreateUserDto {
  @IsString()
  @ApiProperty({
    description: "a summary about the teacher",
    example: '',
  })
  summary: string;

  @IsEnum(Experience)
  @ApiProperty({
    description: "The ",
    example: 'SENIOR',
  })
  experience: Experience;
}
