import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GoogleLoginStrategy extends PassportStrategy(Strategy, 'google-login') {
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.BACKEND_URL}/api/auth/google/login/callback`,
            scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
        console.log('google login strategy / validate');
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);
        const user = {
            email: profile.emails[0].value,
            accessToken,
            refreshToken
        };
        console.log(user);
        console.log("directly before done");
        done(null, user);
    }
}