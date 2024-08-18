import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
} from 'typeorm';
import { Student } from './student.entity';
import { Classroom } from './classroom.entity';
import { PaymentMethod } from '../enums/payment-method.enum';
import { PaymentStatus } from '../enums/payment-status.enum';

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    student_id: number;

    @Column()
    classroom_id: number;

    @Column()
    payment_gateway_order_id: string;

    @Column('float')
    amount: number;

    @Column()
    status: PaymentStatus;

    @CreateDateColumn()
    timestamp: Date;

    @Column()
    paymentMethod: PaymentMethod;

    @ManyToOne(() => Student, (student) => student.payments)
    student: Student;

    @ManyToOne(() => Classroom, (classroom) => classroom.payments)
    classroom: Classroom;
}
