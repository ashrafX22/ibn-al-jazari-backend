import { Inject } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Student } from 'src/models/entities/student.entity';
import { SuperUserEntity } from 'src/modules/user/entities/user.entity';
import { AppDataSource } from 'src/shared/app.data-source';

export class StudentEntity extends SuperUserEntity {
  @ApiProperty()
  id: number;

  @Expose()
  get role() {
    const entityMetadata = AppDataSource.dataSource.getMetadata(Student);
    return entityMetadata.tableName;
  }
  constructor(partial: Partial<StudentEntity>) {
    super(partial);
    Object.assign(this, partial);
  }
}
