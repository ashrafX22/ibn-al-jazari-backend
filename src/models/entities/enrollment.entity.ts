import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Student } from './student.entity';
import { Classroom } from './classroom.entity';

@Entity()
export class Enrollment {
  @PrimaryColumn()
  studentId: number;

  @PrimaryColumn()
  classroomId: number;

  @Column()
  enrollmentDate: Date;

  @ManyToOne(() => Student, (student) => student.enrollments)
  student: Student;

  @ManyToOne(() => Classroom, (classroom) => classroom.enrollments)
  classroom: Classroom;
}
