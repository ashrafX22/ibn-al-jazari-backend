import { PaymentMethod } from 'src/models/enums/payment-method.enum';
import { StudentEntity } from 'src/modules/student/entities/student.entity';

export interface CreatePaymentDetails {
  id: string;

  paymentMethod: PaymentMethod;

  student: StudentEntity;

  classroom: any;
}
