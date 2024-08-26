import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google-auth') {
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
            scope: [
                'profile',
                'email',
                // 'https://www.googleapis.com/auth/userinfo.email',
                // 'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/calendar',
            ],
            accessType: 'offline', // Request offline access to get the refresh token
            access_type: 'offline', // double checking
            prompt: 'consent', // Force consent to ensure a refresh token is returned
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