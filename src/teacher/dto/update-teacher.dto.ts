import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTeacherDto } from './create-teacher.dto';
import { IS_ALPHA, IsAlpha, IsNotEmpty } from 'class-validator';

export class UpdateTeacherDto {
  @ApiProperty()
  username?: string;

  @ApiProperty()
  summary?: string;

  @ApiProperty()
  phoneNumber?: string;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  accessToken?: string;

  @ApiProperty()
  refreshToken?: string;
}
