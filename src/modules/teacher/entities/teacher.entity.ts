import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/models/enums/role.enum';
import { SuperUserEntity } from 'src/modules/user/entities/user.entity';

export class TeacherEntity extends SuperUserEntity {
  @ApiProperty()
  id: number;


  @ApiProperty()
  summary: string;

  @ApiProperty()
  experience: Role;

  constructor(partial: Partial<TeacherEntity>) {
    super(partial);
    Object.assign(this, partial);
  }
}
