import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
} from 'typeorm';
import { Teacher } from './teacher.entity';
import { PaymentMethod } from '../enums/payment-method.enum';
import { PaymentStatus } from '../enums/payment-status.enum';

@Entity()
export class TeachersPayment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    teacher_id: number;

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

    @ManyToOne(() => Teacher, (teacher) => teacher.teachersPayments)
    teacher: Teacher;
}
