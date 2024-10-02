import { IsEnum, IsString, Matches } from 'class-validator';
import { PaymentGateway } from 'src/models/enums/payment-gateway.enum';
import { PaymentMethod } from 'src/models/enums/payment-method.enum';

export class CreatePaymentDto {
  @IsString()
  studentId: string;

  @IsString()
  classroomId: string;

  @Matches(/^(0[1-9]|1[0-2])-(\d{4})$/)
  month: string;

  @IsEnum(PaymentGateway)
  paymentGateway: PaymentGateway;

  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;
}
