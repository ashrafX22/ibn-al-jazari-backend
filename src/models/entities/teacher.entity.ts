import { Entity, OneToMany, Column, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../baseUser';
import { Classroom } from './classroom.entity';
import { Paycheck } from './paycheck.entity';
import { Experience } from '../enums/experience.enum';
import { Role } from '../enums/role.enum';
import { TeacherStatus } from '../enums/teacher-status.enum';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column(() => User)
  common: User;

  @Column({ default: Role.TEACHER })
  role?: Role;

  @Column({ default: '' })
  summary: string;

  @Column()
  ijazaPhotoUrl: string;

  @Column({ default: Experience.JUNIOR })
  experience: Experience;

  @Column({ default: TeacherStatus.PENDING })
  status: TeacherStatus;

  @OneToMany(() => Classroom, (classroom) => classroom.teacher, {
    cascade: true,
    onDelete: 'SET NULL', // Set null if classroom is deleted
  })
  classrooms: Classroom[];

  @OneToMany(() => Paycheck, (teachersPayment) => teachersPayment.teacher)
  teachersPayments: Paycheck[];
}
