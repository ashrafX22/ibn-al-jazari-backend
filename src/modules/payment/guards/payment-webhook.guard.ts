import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class PaymentWebhookGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log(`payment-webhook.guard.ts`);

    const request = context.switchToHttp().getRequest();

    const allowedPaymentGatewayIPs = [process.env.FAWATERAK_WEBHOOK_IP];
    const paymentGatewayWebhookIP =
      request.headers['x-forwarded-for'].split(',')[0];

    console.log(
      `payment-webhook.guard.ts paymentGatewayIP: `,
      paymentGatewayWebhookIP,
    );

    return allowedPaymentGatewayIPs.includes(paymentGatewayWebhookIP);
  }
}
