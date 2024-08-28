import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Jwt } from './jwt.interface'

@Injectable()
export class JwtUtilService {
    constructor(private readonly jwtService: JwtService) { }

    issueJwt(payload: Jwt): string {
        const { iat, exp, ...purePayload } = payload;

        // Reuse the existing iat and exp if they are present
        // const signOptions = {
        //     ...(iat && { iat }),
        //     ...(exp && { expiresIn: exp - Math.floor(Date.now() / 1000) }),
        // };

        // return this.jwtService.sign(purePayload, signOptions);

        return this.jwtService.sign(purePayload);
    }
}
