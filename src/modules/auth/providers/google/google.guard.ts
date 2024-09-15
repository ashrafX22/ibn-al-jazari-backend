import { ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import * as passport from 'passport';

export class GoogleAuthGuard extends AuthGuard('google') {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();

        console.log("google auth guard");

        return new Promise((resolve, reject) => {
            passport.authenticate('google', {
                accessType: 'offline',
                prompt: 'consent',
            }, (err, user, info) => {
                if (err) {
                    console.error('Authentication Error:', err);
                    return reject(false);
                }
                if (!user) {
                    console.error('No user received from Google OAuth');
                    return reject(false);
                }
                // Manually attach user to req.user
                request.user = user;
                resolve(true);
            })(request, response);
        });
    }
}