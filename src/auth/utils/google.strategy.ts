import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { Role, Gender } from '@prisma/client';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authService: AuthService,
    ) {
        super({
            // TODO: use env variables
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/api/auth/google/redirect',
            scope: ['profile', 'email'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
        console.log('strategy');
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);
        try {
            const user = await this.authService.googleLogin({
                email: profile.emails[0].value,
                name: profile.displayName,
                access_token: accessToken,
                refresh_token: 'refreshToken',
                gender: Gender.MALE,
                age: 39,
            });
            console.log('strategy');
            console.log(user);
            done(null, user);
        } catch (err) {
            done(err, false);
        }
    }
}
