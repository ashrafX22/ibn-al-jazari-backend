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
export class Paycheck {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  teacherId: string;

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
