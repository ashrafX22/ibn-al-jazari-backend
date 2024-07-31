import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShiekhModule } from './shiekh/shiekh.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ShiekhModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
