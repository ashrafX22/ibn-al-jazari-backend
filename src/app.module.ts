import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [UserModule, PrismaModule, AuthModule, PassportModule.register({ session: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
