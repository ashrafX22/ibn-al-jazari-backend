import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ROLES_KEY } from './roles.decorator';
import { Experience } from 'src/models/enums/experience.enum';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    constructor(private jwtService: JwtService) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader)
            throw new UnauthorizedException('Authorization header is missing');

        const [type, token] = authHeader.split(' ');

        if (type !== 'Bearer' || !token)
            throw new UnauthorizedException('Invalid token');

        try {
            const payload = this.jwtService.verify(token);
            request.user = payload;
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }

}

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {
        console.log("AuthenticatedGuard");
        const request = context.switchToHttp().getRequest();
        return request.isAuthenticated();
    }
}

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Experience[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        console.log("RolesGuard");
        return requiredRoles.includes(user.role);
        return requiredRoles.some((role) => user.roles?.includes(role));
    }
}