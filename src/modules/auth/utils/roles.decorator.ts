import { SetMetadata } from '@nestjs/common';
import { Experience } from 'src/models/enums/experience.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Experience[]) => SetMetadata(ROLES_KEY, roles);