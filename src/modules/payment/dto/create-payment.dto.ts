import { PaymentGateway } from 'src/models/enums/payment-gateway.enum';
import { PaymentMethod } from 'src/models/enums/payment-method.enum';

export class CreatePaymentDto {
  studentId: string;

  classroomId: string;

  paymentGateway: PaymentGateway;

  paymentMethod: PaymentMethod;
}
