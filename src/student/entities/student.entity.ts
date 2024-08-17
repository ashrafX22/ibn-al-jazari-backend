export class StudentEntity {
  name: string;
  email: string;

  constructor(partial: Partial<StudentEntity>) {
    Object.assign(this, partial);
  }
}
