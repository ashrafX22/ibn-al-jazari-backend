import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class PaymentWebhookGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log(`payment-webhook.guard.ts`);

    const request = context.switchToHttp().getRequest();

    const allowedPaymentGatewayIPs = [process.env.FAWATERAK_IP];
    const paymentGatewayIP = request.headers['x-forwarded-for'];

    console.log(`payment-webhook.guard.ts paymentGatewayIP: `, paymentGatewayIP);

    return allowedPaymentGatewayIPs.includes(paymentGatewayIP);
  }
}
