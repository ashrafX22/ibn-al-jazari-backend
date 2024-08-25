import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { EXPERIENCES_KEY, ROLES_KEY } from './roles.decorator';
import { Experience } from 'src/models/enums/experience.enum';
import { Role } from 'src/models/enums/role.enum';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { }

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
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

@Injectable()
export class ExperienceGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredExperiences = this.reflector.getAllAndOverride<Experience[]>(EXPERIENCES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredExperiences) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        console.log("RolesGuard");
        return requiredExperiences.includes(user.role);
        return requiredExperiences.some((role) => user.roles?.includes(role));
    }
}