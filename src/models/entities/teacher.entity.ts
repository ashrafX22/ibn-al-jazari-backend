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

  @Column({ default: '' })
  summary: string;

  @Column({ default: Role.SHEIKH })
  proficiencyLevel: Role;

  @OneToMany(() => Classroom, (classroom) => classroom.teacher)
  classrooms: Classroom[];

  @OneToMany(
    () => TeachersPayment,
    (teachersPayment) => teachersPayment.teacher,
  )
  teachersPayments: TeachersPayment[];
}
