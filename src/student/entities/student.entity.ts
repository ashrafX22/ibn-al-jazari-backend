import { UserEntity } from 'src/user/entities/user.entity';

export class StudentEntity extends UserEntity {
  id: number;
  constructor(partial: Partial<StudentEntity>) {
    super(partial);
    Object.assign(this, partial);
  }
}
