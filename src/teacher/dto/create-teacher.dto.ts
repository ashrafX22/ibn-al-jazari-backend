import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/models/enums/role.enum';
import { CreateUserDto } from './../../user/dto/create.user.dto';

export class CreateTeacherDto extends CreateUserDto {
  @ApiProperty()
  @IsString()
  summary: string;

  @ApiProperty()
  @IsEnum(Role)
  proficiencyLevel: Role;
}
