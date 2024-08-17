import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './utils/google.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SessionSerializer } from './utils/session.serializer';
import { StudentService } from 'src/student/student.service';
import { PassportModule } from '@nestjs/passport';
import { TeacherService } from 'src/teacher/teacher.service';

@Module({
  imports: [PrismaModule, PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    StudentService,
    TeacherService,
    GoogleStrategy,
    SessionSerializer
  ],
})
export class AuthModule { }
