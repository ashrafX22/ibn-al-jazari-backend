import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Teacher } from './teacher.entity';
import { Enrollment } from './enrollment.entity';
import { Payment } from './payment.entity';
import { Subject } from './subject.entity';
import { Appointment } from './appointment.entity';

@Entity()
export class Classroom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 40 })
  name: string;

  @Column()
  teacherId: string;

  @Column()
  subjectId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Teacher, (teacher) => teacher.classrooms, {
    onDelete: 'CASCADE', // When a teacher is deleted, the classroom is also deleted
  })
  @JoinColumn({ name: 'teacherId' })
  teacher: Teacher;

  @ManyToOne(() => Subject, (subject) => subject.classrooms, {
    onDelete: 'CASCADE', // When a subject is deleted, the classroom is also deleted
  })
  @JoinColumn({ name: 'subjectId' })
  subject: Subject;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.classroom, {
    cascade: true, // this allows cascading operations on enrollments
  })
  enrollments: Enrollment[];

  @OneToMany(() => Appointment, (appointment) => appointment.classroom, {
    cascade: true, // cascade operations on appointments
    onDelete: 'CASCADE', // delete appointments when the classroom is deleted
    onUpdate: 'CASCADE', // update appointments if classroom ID is changed
  })
  appointments: Appointment[];

  @OneToMany(() => Payment, (payment) => payment.classroom, {
    cascade: true, // cascade operations on payments as well
  })
  payments: Payment[];
}
