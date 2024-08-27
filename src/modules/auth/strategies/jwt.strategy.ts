import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Jwt } from '../utils/jwt.interface';
import { AuthService } from '../auth.service';
import { ROLES_KEY } from '../utils/roles.decorator';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    // stores the decoded jwt in req.user
    async validate(payload: Jwt) {
        return payload;
    }
}
