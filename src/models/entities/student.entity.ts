import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../baseUser';
import { Payment } from './payment.entity';
import { Enrollment } from './enrollment.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column(() => User)
  common: User;

  @Column({ default: 'student' })
  role?: string;

  @OneToMany(() => Payment, (payment) => payment.student)
  payments: Payment[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  enrollments: Enrollment[];
}
