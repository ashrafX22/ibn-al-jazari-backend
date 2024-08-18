import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authService: AuthService,
    ) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/api/auth/google/redirect',
            scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile) {
        console.log('strategy');
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);
        const user = await this.authService.validateUser(accessToken, refreshToken, profile.emails[0].value);
        console.log("strategy")
        console.log(user);
        return user;
    }
}