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

  @IsString()
  @ApiProperty({
    description: "the url of the ijaza photo",
  })
  ijazaPhotoUrl: string;

  @IsEnum(Experience)
  @ApiProperty({
    description: "The experience level of the teacher",
    example: 'senior',
  })
  experience: Experience;
}
