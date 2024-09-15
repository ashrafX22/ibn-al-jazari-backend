import { ApiProperty } from '@nestjs/swagger';

export class EnrollmentEntity {
  @ApiProperty()
  studentId: string;

  @ApiProperty()
  classroomId: string;

  @ApiProperty()
  enrollmentDate: Date;

  //add or execlude or expose fields as needed

  constructor(partial: Partial<EnrollmentEntity>) {
    Object.assign(this, partial);
  }
}
