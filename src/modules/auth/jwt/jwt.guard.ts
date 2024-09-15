import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PublicRouteService } from '../public-route/public.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private publicRouteService: PublicRouteService) {
        super();
    }

    canActivate(context: ExecutionContext) {
        console.log("jwtAuthGuard");
        // If the route is public, bypass the guard
        if (this.publicRouteService.isPublicRoute(context))
            return true;

        return super.canActivate(context);
    }
}