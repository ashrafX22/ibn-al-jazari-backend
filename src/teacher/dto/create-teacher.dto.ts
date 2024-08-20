import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/models/enums/role.enum';
import { CreateUsertDto } from './../../user/dto/create.user.dto';

export class CreateTeacherDto extends CreateUsertDto {
  @ApiProperty()
  @IsString()
  summary: string;

  @ApiProperty()
  @IsEnum(Role)
  proficiencyLevel: Role;
}
