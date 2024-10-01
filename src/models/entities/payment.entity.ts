import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Student } from './student.entity';
import { Classroom } from './classroom.entity';
import { PaymentMethod } from '../enums/payment-method.enum';
import { PaymentStatus } from '../enums/payment-status.enum';
import { PaymentGateway } from '../enums/payment-gateway.enum';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  studentId: string;

  @Column()
  classroomId: string;

  @Column()
  paymentGateway: PaymentGateway;

  @Column()
  paymentMethod: PaymentMethod;

  @Column({ unique: true, nullable: true })
  paymentGatewayOrderId: string;

  @Column('float')
  amount: number;

  @Column({ default: PaymentStatus.PENDING })
  status: PaymentStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Student, (student) => student.payments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'studentId' })
  student: Student;

  @ManyToOne(() => Classroom, (classroom) => classroom.payments, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'classroomId' })
  classroom: Classroom;
}
