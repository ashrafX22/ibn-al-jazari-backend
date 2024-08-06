import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';

export function loginSwaggerDoc() {
    return applyDecorators(
        ApiOperation({
            summary: "Handles the login process for Google authentication.",
            description: "This endpoint is responsible for initiating the OAuth2 flow with Google. \
            It uses the `GoogleAuthGuard` to authenticate the user and redirect them to the Google login page."
        })
    );
}

export function redirectSwaggerDoc() {
    return applyDecorators(
        ApiOperation({
            summary: "Handles the redirection after a successful Google authentication.",
        }),
        ApiResponse({ status: 302, description: 'Redirects to the frontend URL after successful authentication' }),
        ApiResponse({ status: 401, description: 'Unauthorized' })
    );
}

export function getUserSwaggerDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Get the authenticated user' }),
        ApiResponse({ status: 200, description: 'Returns the authenticated user' }),
        ApiResponse({ status: 401, description: 'Unauthorized' })
    );
}

export function logoutSwaggerDoc() {
    return applyDecorators(
        ApiOperation({ summary: 'Log out the authenticated user' }),
        ApiResponse({ status: 302, description: 'Redirects to the frontend URL after successful logout' }),
        ApiResponse({ status: 401, description: 'Unauthorized' })
    );
}