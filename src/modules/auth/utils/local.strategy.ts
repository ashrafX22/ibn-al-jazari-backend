import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(email: string, password: string): Promise<any> {
        console.log('local strategy');
        console.log(email, password);
        const user = await this.authService.localValidateUser(email, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}