import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTeacherDto } from './create-teacher.dto';
import { IS_ALPHA, IsAlpha, IsNotEmpty } from 'class-validator';

export class UpdateTeacherDto extends PartialType(CreateTeacherDto) {}
