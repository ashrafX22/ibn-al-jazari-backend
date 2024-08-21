import { IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/models/enums/role.enum';
import { CreateUserDto } from './../../user/dto/create.user.dto';

export class CreateTeacherDto extends CreateUserDto {
  @ApiProperty({
    description: "URL of the user's profile picture",
    example: 'https://example.com/profile-picture.jpg',
  })
  @IsString()
  summary: string;

  @IsEnum(Role)
  @ApiProperty({
    description: "URL of the user's profile picture",
    example: 'https://example.com/profile-picture.jpg',
  })
  proficiencyLevel: Role;
}
