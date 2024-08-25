import { ApiProperty } from '@nestjs/swagger';
import { Experience } from 'src/models/enums/experience.enum';
import { SuperUserEntity } from 'src/modules/user/entities/user.entity';

export class TeacherEntity extends SuperUserEntity {
  @ApiProperty()
  id: number;


  @ApiProperty()
  summary: string;

  @ApiProperty()
  experience: Experience;

  constructor(partial: Partial<TeacherEntity>) {
    super(partial);
    Object.assign(this, partial);
  }
}
