import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/models/enums/role.enum';
import { SuperUserEntity } from 'src/modules/user/entities/user.entity';

export class StudentEntity extends SuperUserEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  role: Role;

  constructor(partial: Partial<StudentEntity>) {
    super(partial);
    Object.assign(this, partial);
  }
}
