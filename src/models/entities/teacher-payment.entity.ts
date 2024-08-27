import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Teacher } from './teacher.entity';
import { PaymentMethod } from '../enums/payment-method.enum';
import { PaymentStatus } from '../enums/payment-status.enum';

@Entity()
export class TeachersPayment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    teacherId: number;

    @Column()
    paymentGatewayOrderId: string;

    @Column('float')
    amount: number;

    @Column()
    status: PaymentStatus;

    @CreateDateColumn()
    timestamp: Date;

    @Column()
    paymentMethod: PaymentMethod;

    @ManyToOne(() => Teacher, (teacher) => teacher.teachersPayments)
    @JoinColumn({ name: 'teacherId' })
    teacher: Teacher;
}
