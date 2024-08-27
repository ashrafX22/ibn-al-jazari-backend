import { HttpService } from "@nestjs/axios";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { UserService } from "src/modules/user/user.service";

@Injectable()
export class GoogleTokenService {

    constructor(
        private userService: UserService,
        private httpService: HttpService
    ) { }


    async validateAndRefreshGoogleAccessToken(email: string, googleAccessToken: string): Promise<string> {
        if (!this.isValidGoogleAccessToken(googleAccessToken))
            return await this.refreshGoogleAccessToken(email);
        return googleAccessToken;
    }

    async isValidGoogleAccessToken(googleAccessToken: string): Promise<boolean> {
        console.log("isValidGoogleAccessToken");
        try {
            const url = `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${googleAccessToken}`;

            const response = await firstValueFrom(this.httpService.get(url));

            return response.status === 200;
        } catch (error) {
            return false;
        }
    }

    async refreshGoogleAccessToken(email: string): Promise<string> {
        console.log("refreshGoogleAccessToken");

        const user = await this.userService.findByEmail(email);

        if (!user || !user.googleRefreshToken)
            throw new UnauthorizedException('No refresh token available. Please log in again.');

        const tokenUrl = 'https://oauth2.googleapis.com/token';
        const params = new URLSearchParams({
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            refresh_token: user.googleRefreshToken,
            grant_type: 'refresh_token',
        });

        console.log("refreshGoogleAccessToken refresh token", user.googleRefreshToken);

        try {
            const response = await firstValueFrom(
                this.httpService.post(tokenUrl, params.toString(), {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                }),
            );

            const { access_token } = response.data;

            return access_token;
        } catch (error) {
            throw new UnauthorizedException('Failed to refresh access token. Please log in again.');
        }
    }
}