import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/models/enums/role.enum';
import { CreateUserDto } from './../../user/dto/create.user.dto';

export class CreateTeacherDto extends CreateUserDto {
  @IsString()
  @ApiProperty({
    description: "a summary about the teacher",
    example: '',
  })
  summary: string;

  @IsEnum(Role)
  @ApiProperty({
    description: "The ",
    example: 'SENIOR',
  })
  experience: Role;
}
