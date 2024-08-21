import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Role } from 'src/models/enums/role.enum';
import { UserEntity } from 'src/user/entities/user.entity';

export class TeacherEntity extends UserEntity {
  @ApiProperty()
  id: number;
  @ApiProperty()
  summary: string;
  @ApiProperty()
  proficiencyLevel: Role;

  constructor(partial: Partial<TeacherEntity>) {
    super(partial);
    Object.assign(this, partial);
  }
}
