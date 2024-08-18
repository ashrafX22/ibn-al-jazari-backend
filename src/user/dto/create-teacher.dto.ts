import { CreateUserDto } from './create-user.dto';
import { IsArray, IsEnum, IsString } from 'class-validator';
import { Role } from 'src/models/enums/role.enum';

export class CreateTeacherDto extends CreateUserDto {
    @IsString()
    summary: string;

    @IsEnum(Role)
    proficiency_level: Role;
}