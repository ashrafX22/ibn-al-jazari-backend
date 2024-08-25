import { SetMetadata } from '@nestjs/common';
import { Experience } from 'src/models/enums/experience.enum';
import { Role } from 'src/models/enums/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

export const EXPERIENCES_KEY = 'experience';
export const Experiences = (...experiences: Experience[]) => SetMetadata(EXPERIENCES_KEY, experiences);