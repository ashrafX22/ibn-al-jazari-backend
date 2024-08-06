import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GoogleMeetModule } from './google-meet/google-meet.module';
@Module({
  imports: [UserModule, PrismaModule, AuthModule, GoogleMeetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
