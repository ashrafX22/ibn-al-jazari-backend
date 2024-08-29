import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './providers/google/google.strategy';
import { PassportModule } from '@nestjs/passport';
import { GoogleAuthGuard } from './providers/google/google.guard';
import { RolesGuard } from './guards/roles.guard';
import { ExperiencesGuard } from './guards/experiences.guard';
import { User } from 'src/models/baseUser';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from 'src/models/entities/teacher.entity';
import { Student } from 'src/models/entities/student.entity';
import { StudentService } from 'src/modules/student/student.service';
import { TeacherService } from 'src/modules/teacher/teacher.service';
import { UserService } from 'src/modules/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './jwt/jwt.strategy';
import { HttpModule } from '@nestjs/axios';
import { GoogleTokenService } from './providers/google/google-token.service';
import { GoogleAuthService } from './providers/google/google-auth.service';
import { LocalStrategy } from './providers/local/local.strategy';
import { LocalAuthService } from './providers/local/local-auth.service';
import { JwtUtilService } from './jwt/jwt-util.service';
import { Classroom } from 'src/models/entities/classroom.entity';
import { Meeting } from 'src/models/entities/meeting.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User, Student, Teacher, Classroom, Meeting]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { algorithm: 'HS256', expiresIn: '7d' },
    }),
    HttpModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    UserService,
    StudentService,
    TeacherService,
    RolesGuard,
    ExperiencesGuard,
    JwtStrategy,
    JwtUtilService,
    LocalStrategy,
    LocalAuthService,
    GoogleStrategy,
    GoogleAuthGuard,
    GoogleAuthService,
    GoogleTokenService,
  ],
  exports: [AuthService, JwtModule, GoogleTokenService],
})
export class AuthModule {}
