import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
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
  @JoinColumn({ name: 'studentId' })
  student: Student;

  @ManyToOne(() => Classroom, (classroom) => classroom.enrollments)
  @JoinColumn({ name: 'classroomId' })
  classroom: Classroom;
}
