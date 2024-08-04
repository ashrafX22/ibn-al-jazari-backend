import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './utils/google.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SessionSerializer } from './utils/serializer';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    UserService,
    GoogleStrategy,
    SessionSerializer
  ],
})
export class AuthModule { }
