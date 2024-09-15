import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordHashInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const body = request.body;
    if (!body.password) {
      throw new BadRequestException('Password is required');
    }
    // Hash the password
    const saltRounds = 10;
    body.password = await bcrypt.hash(body.password, saltRounds);

    return next.handle();
  }
}
