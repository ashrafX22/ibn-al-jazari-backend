import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../baseUser';
import { Payment } from './payment.entity';
import { Enrollment } from './enrollment.entity';
import { Role } from '../enums/role.enum';

@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column(() => User)
  common: User;

  @Column({ default: Role.STUDENT })
  role?: Role;

  @OneToMany(() => Payment, (payment) => payment.student)
  payments: Payment[];

  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  enrollments: Enrollment[];
}
