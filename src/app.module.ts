import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShiekhModule } from './shiekh/shiekh.module';
<<<<<<< HEAD
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ShiekhModule, PrismaModule],
=======
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ShiekhModule, AuthModule],
>>>>>>> 145f908 ([add] google oauth2)
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
