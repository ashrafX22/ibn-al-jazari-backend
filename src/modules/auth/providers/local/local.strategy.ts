import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LocalAuthService } from './local-auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private localAuthService: LocalAuthService) {
        super();
    }

    async validate(email: string, password: string): Promise<any> {
        console.log('local strategy');
        console.log(email, password);
        const user = await this.localAuthService.localValidateUser(email, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}