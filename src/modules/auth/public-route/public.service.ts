import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PUBLIC_ROUTE_KEY } from './public-route.decorator';

@Injectable()
export class PublicRouteService {
    constructor(private reflector: Reflector) { }

    isPublicRoute(context: ExecutionContext): boolean {
        // Check if the route is public by looking for the @Public() decorator
        return this.reflector.getAllAndOverride<boolean>(PUBLIC_ROUTE_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
    }
}
