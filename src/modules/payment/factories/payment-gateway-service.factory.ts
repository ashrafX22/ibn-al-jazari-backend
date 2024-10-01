import { Injectable, NotFoundException } from '@nestjs/common';
import { FawaterakPaymentGatewayService } from '../gateways/fawaterak/fawaterak.service';
import { PaymentGateway } from 'src/models/enums/payment-gateway.enum';
import { IPaymentGatewayService } from '../interfaces/payment-gateway-service.interface';

@Injectable()
export class PaymentGatewayServiceFactory {
  constructor(
    private readonly fawaterakPaymentGatewayService: FawaterakPaymentGatewayService,
    // Add other services as needed
  ) {}

  getPaymentGatewayService(paymentGateway: string): IPaymentGatewayService {
    switch (paymentGateway) {
      case PaymentGateway.FAWATERAK:
        return this.fawaterakPaymentGatewayService;
      // Add cases for other payment gateways
      default:
        throw new NotFoundException('Unsupported payment gateway');
    }
  }
}
