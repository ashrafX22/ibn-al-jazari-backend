import { ApiProperty } from '@nestjs/swagger';

export class classroomEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  teacherId: string;

  @ApiProperty()
  subjectId: string;

  // add or exclude or expose properties as needed

  constructor(partial: Partial<classroomEntity>) {
    Object.assign(this, partial);
  }
}
