import { ApiProperty } from '@nestjs/swagger';
import { SuperUserEntity } from 'src/modules/user/entities/user.entity';

export class StudentEntity extends SuperUserEntity {
  @ApiProperty()
  id: number;

  constructor(partial: Partial<StudentEntity>) {
    super(partial);
    Object.assign(this, partial);
  }
}
