import { CreatePaymentDetails } from './create-payment-details.interface';

export interface IPaymentGatewayService {
  create(createPaymentDetails: CreatePaymentDetails);
  getOrderId(transactionResponseDto: any);
}
