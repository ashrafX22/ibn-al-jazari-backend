import { SetMetadata } from '@nestjs/common';
import { Experience } from 'src/models/enums/experience.enum';

export const EXPERIENCES_KEY = 'experience';
export const Experiences = (...experiences: Experience[]) => SetMetadata(EXPERIENCES_KEY, experiences);
