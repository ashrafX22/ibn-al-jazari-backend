import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class PaymentCallbackGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log(`payment-callback.guard.ts`);

    const request = context.switchToHttp().getRequest();

    const allowedIPs = [process.env.FAWATERAK_CALLBACK_IP];
    const paymentGatewayCallbackIP =
      request.headers['x-forwarded-for'].split(',')[0];

    console.log(
      `payment-callback.guard.ts paymentGatewayCallbackIP: `,
      paymentGatewayCallbackIP,
    );

    return allowedIPs.includes(paymentGatewayCallbackIP);
  }
}
