import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Student } from './student.entity';
import { Classroom } from './classroom.entity';
import { PaymentMethod } from '../enums/payment-method.enum';
import { PaymentStatus } from '../enums/payment-status.enum';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  studentId: string;

  @Column()
  classroomId: string;

  @Column()
  paymentGatewayOrderId: string;

  // TODO: should we keep this and why? we can get it from the subject price
  @Column('float')
  amount: number;

  @Column()
  status: PaymentStatus;

  @CreateDateColumn()
  timestamp: Date;

  @Column()
  paymentMethod: PaymentMethod;

  @ManyToOne(() => Student, (student) => student.payments)
  @JoinColumn({ name: 'studentId' })
  student: Student;

  @ManyToOne(() => Classroom, (classroom) => classroom.payments)
  @JoinColumn({ name: 'classroomId' })
  classroom: Classroom;
}
