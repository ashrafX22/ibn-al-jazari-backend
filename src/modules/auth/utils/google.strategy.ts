import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google-auth') {
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
            scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<any> {
        console.log('google strategy / validate');
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);
        const user = {
            email: profile.emails[0].value,
            googleAccessToken: accessToken,
            googleRefreshToken: refreshToken
        };
        done(null, user);
    }
}