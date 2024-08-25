import { Entity, OneToMany, Column, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../baseUser';
import { Classroom } from './classroom.entity';
import { TeachersPayment } from './teacher-payment.entity';
import { Role } from '../enums/role.enum';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column(() => User)
  common: User;

  @Column({ default: 'teacher' })
  role?: string;

  @Column({ default: '' })
  summary: string;

  @Column({ default: Role.JUNIOR })
  experience: Role;

  @OneToMany(() => Classroom, (classroom) => classroom.teacher)
  classrooms: Classroom[];

  @OneToMany(
    () => TeachersPayment,
    (teachersPayment) => teachersPayment.teacher,
  )
  teachersPayments: TeachersPayment[];
}
