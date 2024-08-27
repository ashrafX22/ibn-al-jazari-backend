import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EXPERIENCES_KEY } from '../decorators/roles.decorator';
import { Experience } from 'src/models/enums/experience.enum';

@Injectable()
export class ExperiencesGuard implements CanActivate {
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