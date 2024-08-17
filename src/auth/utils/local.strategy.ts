import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({ studentnameField: 'email' });
    }

    async validate(email: string, password: string): Promise<any> {
        const student = await this.authService.validateStudent(email, password);
        if (!student) {
            throw new UnauthorizedException();
        }
        return student;
    }
}
