import { PartialType } from '@nestjs/mapped-types';
import { CreateShiekhDto } from './create-shiekh.dto';

export class UpdateShiekhDto extends PartialType(CreateShiekhDto) {}
