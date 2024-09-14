import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Teacher } from './teacher.entity';
import { Meeting } from './meeting.entity';
import { Enrollment } from './enrollment.entity';
import { Payment } from './payment.entity';
import { Subject } from './subject.entity';
import { Appointment } from './appointment.entity';

@Entity()
export class Classroom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  teacherId: string;

  @Column()
  subjectId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Teacher, (teacher) => teacher.classrooms)
  @JoinColumn({ name: 'teacherId' })
  teacher: Teacher;

  @ManyToOne(() => Subject, (subject) => subject.classrooms)
  @JoinColumn({ name: 'subjectId' })
  subject: Subject;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.classroom)
  enrollments: Enrollment[];

  @OneToMany(() => Appointment, (appointment) => appointment.classroom)
  appointments: Appointment[];

  @OneToMany(() => Payment, (payment) => payment.classroom)
  payments: Payment[];
}
