import { SetMetadata } from '@nestjs/common';

export const USE_GOOGLE_TOKEN_KEY = 'useGoogleToken';

export const UseGoogleToken = () => SetMetadata(USE_GOOGLE_TOKEN_KEY, true);