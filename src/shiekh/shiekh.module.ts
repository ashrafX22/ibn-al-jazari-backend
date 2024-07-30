import { Module } from '@nestjs/common';
import { ShiekhService } from './shiekh.service';
import { ShiekhController } from './shiekh.controller';

@Module({
  controllers: [ShiekhController],
  providers: [ShiekhService],
})
export class ShiekhModule {}
