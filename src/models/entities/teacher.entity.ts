import { Entity, OneToMany, Column, ChildEntity } from 'typeorm';
import { User } from './user.entity';
import { Classroom } from './classroom.entity';
import { TeachersPayment } from './teacher-payment.entity';
import { Role } from '../enums/role.enum';

@ChildEntity()
export class Teacher extends User {
    @Column({ default: '' })
    summary: string;

    @Column({ default: Role.SHEIKH })
    proficiency_level: Role;

    @OneToMany(() => Classroom, (classroom) => classroom.teacher)
    classrooms: Classroom[];

    @OneToMany(() => TeachersPayment, (teachersPayment) => teachersPayment.teacher)
    teachersPayments: TeachersPayment[];
}