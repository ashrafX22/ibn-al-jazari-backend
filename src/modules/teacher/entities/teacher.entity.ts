import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Experience } from 'src/models/enums/experience.enum';
import { Role } from 'src/models/enums/role.enum';
import { SuperUserEntity } from 'src/modules/user/entities/user.entity';

export class TeacherEntity extends SuperUserEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  role: Role;

  @ApiProperty()
  summary: string;

  @ApiProperty()
  experience: Experience;

  @Exclude()
  ijazaPhotoUrl: string;

  constructor(partial: Partial<TeacherEntity>) {
    super(partial);
    Object.assign(this, partial);
  }
}
