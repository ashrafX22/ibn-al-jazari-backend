import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Payment } from './payment.entity';
import { Enrollment } from './enrollment.entity';

@Entity()
export class Student{
    @PrimaryGeneratedColumn()
    id: number;

    @Column(()=>User)
    common:User

    @OneToMany(() => Payment, (payment) => payment.student)
    payments: Payment[];

    @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
    enrollments: Enrollment[];
}