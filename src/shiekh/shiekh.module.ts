import { Module } from '@nestjs/common';
import { ShiekhService } from './shiekh.service';
import { ShiekhController } from './shiekh.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ShiekhController],
  providers: [ShiekhService],
})
export class ShiekhModule {}
