import { Exclude } from 'class-transformer';
import { PaymentGateway } from 'src/models/enums/payment-gateway.enum';
import { PaymentMethod } from 'src/models/enums/payment-method.enum';
import { PaymentStatus } from 'src/models/enums/payment-status.enum';

export class PaymentEntity {
  id: string;

  studentId: string;

  classroomId: string;

  paymentGateway: PaymentGateway;

  paymentMethod: PaymentMethod;

  amount: number;

  month: string;

  status: PaymentStatus;

  createdAt: Date;

  @Exclude()
  paymentGatewayOrderId: string;

  @Exclude()
  updatedAt: Date;

  constructor(payment: Partial<PaymentEntity>) {
    Object.assign(this, payment);
  }
}
