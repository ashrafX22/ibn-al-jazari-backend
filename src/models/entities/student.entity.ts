import { ChildEntity, Entity, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Payment } from './payment.entity';
import { Enrollment } from './enrollment.entity';

@ChildEntity()
export class Student extends User {
    @OneToMany(() => Payment, (payment) => payment.student)
    payments: Payment[];

    @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
    enrollments: Enrollment[];
}