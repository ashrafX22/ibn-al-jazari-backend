import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GoogleTokenService } from './google-token.service';
import { Jwt } from '../../jwt/jwt.interface';
import { JwtUtilService } from '../../jwt/jwt-util.service';

@Injectable()
export class GoogleTokenInterceptor implements NestInterceptor {
  constructor(
    private readonly googleTokenService: GoogleTokenService,
    private readonly jwtUtilService: JwtUtilService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    if (request.method === 'OPTIONS') {
      console.log('bypassed preflight');
      return next.handle();
    }

    const user: Jwt = request.user;
    const { email } = request.user;
    const { googleAccessToken } = user;

    console.log('GoogleTokenInterceptor');
    console.log('oiginal token', googleAccessToken);

    if (!googleAccessToken)
      throw new UnauthorizedException(
        'No Google access token found in the user payload.',
      );

    const refreshedGoogleAccessToken =
      await this.googleTokenService.validateAndRefreshGoogleAccessToken(
        email,
        googleAccessToken,
      );

    if (refreshedGoogleAccessToken) {
      user.googleAccessToken = refreshedGoogleAccessToken;

      console.log(
        'GoogleTokenInterceptor refreshedGoogleAccessToken',
        refreshedGoogleAccessToken,
      );

      const newJwt = this.jwtUtilService.issueJwt(user);

      // Attach the new JWT to the request headers for other modules to use.
      request.headers['Authorization'] = `Bearer ${newJwt}`;

      // Attach the new JWT to the response header immediately
      response.setHeader('Authorization', `Bearer ${newJwt}`);

      // Proceed with the request flow
      return next.handle();
    }

    // If no refresh is needed, just proceed with the original flow
    return next.handle();
  }
}
