import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from 'src/models/enums/role.enum';
import { PublicRouteService } from '../public-route/public.service';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private publicRouteService: PublicRouteService) { }

    canActivate(context: ExecutionContext): boolean {
        console.log("RolesGuard");
        // If the route is public, bypass the guard
        if (this.publicRouteService.isPublicRoute(context))
            return true;

        // allow Role.ADMIN and roles specified using @Roles()
        const requiredRoles = [Role.ADMIN, ...this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ])];

        console.log("required roles", requiredRoles);

        const { user } = context.switchToHttp().getRequest();
        return requiredRoles.includes(user.role);
    }
}