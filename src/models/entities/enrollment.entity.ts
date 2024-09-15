import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Student } from './student.entity';
import { Classroom } from './classroom.entity';

@Entity()
export class Enrollment {
  @PrimaryColumn('uuid')
  studentId: string;

  @PrimaryColumn('uuid')
  classroomId: string;

  @CreateDateColumn()
  enrollmentDate: Date;

  @ManyToOne(() => Student, (student) => student.enrollments, {
    onDelete: 'CASCADE', // When a student is deleted, the enrollment is also deleted
  })
  @JoinColumn({ name: 'studentId' })
  student: Student;

  @ManyToOne(() => Classroom, (classroom) => classroom.enrollments, {
    onDelete: 'CASCADE', // When a classroom is deleted, the enrollment is also deleted
  })
  @JoinColumn({ name: 'classroomId' })
  classroom: Classroom;
}
