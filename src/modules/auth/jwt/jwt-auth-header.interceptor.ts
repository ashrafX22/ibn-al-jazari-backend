import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';

@Injectable()
export class JwtAuthHeaderInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse<Response>();

        return next.handle().pipe(
            map((data) => {
                const jwtAuthHeader = data?.jwt;

                if (jwtAuthHeader)
                    response.setHeader('Authorization', `Bearer ${jwtAuthHeader}`);

                const { jwt, ...responseBody } = data;

                return responseBody;
            }),
        );
    }
}
