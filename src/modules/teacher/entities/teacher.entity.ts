import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Teacher } from 'src/models/entities/teacher.entity';
import { Role } from 'src/models/enums/role.enum';
import { SuperUserEntity } from 'src/modules/user/entities/user.entity';
import { AppDataSource } from 'src/shared/app.data-source';

export class TeacherEntity extends SuperUserEntity {
  @ApiProperty()
  id: number;

  @Expose()
  get role() {
    const entityMetadata = AppDataSource.dataSource.getMetadata(Teacher);
    return entityMetadata.tableName;
  }

  @ApiProperty()
  summary: string;

  @ApiProperty()
  experience: Role;

  constructor(partial: Partial<TeacherEntity>) {
    super(partial);
    Object.assign(this, partial);
  }
}
