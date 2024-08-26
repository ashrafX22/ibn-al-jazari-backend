import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './utils/google.strategy';
import { PassportModule } from '@nestjs/passport';
import { ExperienceGuard, GoogleAuthGuard, JwtAuthGuard, RolesGuard } from './utils/guards';
import { User } from 'src/models/baseUser';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from 'src/models/entities/teacher.entity';
import { Student } from 'src/models/entities/student.entity';
import { StudentService } from 'src/modules/student/student.service';
import { TeacherService } from 'src/modules/teacher/teacher.service';
import { LocalStrategy } from './utils/local.strategy';
import { UserService } from 'src/modules/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './utils/jwt.strategy';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User, Student, Teacher]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { algorithm: 'HS256', expiresIn: '7d' },
    }),
    HttpModule
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
    JwtAuthGuard,
    RolesGuard,
    ExperienceGuard,
    JwtStrategy,
    LocalStrategy,
    GoogleStrategy,
    GoogleAuthGuard
  ],
  exports: [AuthService, JwtModule]
})
export class AuthModule { }
