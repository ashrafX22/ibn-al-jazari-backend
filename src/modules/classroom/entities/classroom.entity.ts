import { ApiProperty } from '@nestjs/swagger';

export class classroomEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  teacherId: number;

  @ApiProperty()
  subjectId: number;

  // add or exclude or expose properties as needed

  constructor(partial: Partial<classroomEntity>) {
    Object.assign(this, partial);
  }
}
