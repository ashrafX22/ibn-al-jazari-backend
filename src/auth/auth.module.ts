import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './utils/google.strategy';
import { SessionSerializer } from './utils/session.serializer';
import { UserService } from 'src/user/user.service';
import { PassportModule } from '@nestjs/passport';
import { AuthenticatedGuard, RolesGuard } from './utils/guards';
import { User } from 'src/models/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from 'src/models/entities/teacher.entity';
import { Student } from 'src/models/entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Student, Teacher]), PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    AuthenticatedGuard,
    RolesGuard,
    UserService,
    GoogleStrategy,
    SessionSerializer
  ],
})
export class AuthModule { }
