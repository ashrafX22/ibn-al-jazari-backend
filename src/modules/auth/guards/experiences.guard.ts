import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EXPERIENCES_KEY } from '../decorators/experiences.decorator';
import { Experience } from 'src/models/enums/experience.enum';
import { PublicRouteService } from '../public-route/public.service';

@Injectable()
export class ExperiencesGuard implements CanActivate {
    constructor(private reflector: Reflector, private publicRouteService: PublicRouteService) { }

    canActivate(context: ExecutionContext): boolean {
        console.log("ExperiencesGuard");
        // If the route is public, bypass the guard
        if (this.publicRouteService.isPublicRoute(context))
            return true;

        const requiredExperiences = this.reflector.getAllAndOverride<Experience[]>(EXPERIENCES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        console.log("required experiences", requiredExperiences);

        if (!requiredExperiences)
            return false;

        const { user } = context.switchToHttp().getRequest();
        return requiredExperiences.includes(user.role);
    }
}