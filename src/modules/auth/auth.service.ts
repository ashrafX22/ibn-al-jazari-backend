import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { LocalAuthService } from './providers/local/local-auth.service';
import { GoogleAuthService } from './providers/google/google-auth.service';
import { CreateStudentDto } from '../student/dto/create-student.dto';
import { AuthProvider } from './providers/auth-provider.enum';
import { CreateTeacherDto } from '../teacher/dto/create-teacher.dto';


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private localAuthService: LocalAuthService,
    private googleAuthService: GoogleAuthService,
  ) { }

  async getUser(id: string) {
    const user = this.userService.findById(id);

    if (!user) throw new NotFoundException('user not found');

    return user;
  }

  async login(strategy: string, credentials: any) {
    switch (strategy) {
      case AuthProvider.LOCAL:
        return this.localAuthService.localLogin(credentials);
        break;
      case AuthProvider.GOOGLE:
        return this.googleAuthService.googleAuth(credentials);
        break;
      default:
        throw new NotFoundException('Unsupported login method');
    }
    // Handle other strategies
  }

  async registerStudent(strategy: string, createStudentDto: CreateStudentDto) {
    switch (strategy) {
      case AuthProvider.LOCAL:
        return this.localAuthService.localRegister(createStudentDto);
        break;
      case AuthProvider.GOOGLE:
        return this.googleAuthService.googleRegisterStudent(createStudentDto);
        break;
      default:
        throw new NotFoundException('Unsupported registration method');
    }
    // Handle other strategies
  }

  async registerTeacher(strategy: string, createTeacherDto: CreateTeacherDto) {
    switch (strategy) {
      case AuthProvider.GOOGLE:
        return this.googleAuthService.googleRegisterTeacher(createTeacherDto);
        break;
      default:
        throw new NotFoundException('Unsupported registration method');
    }
    // Handle other strategies
  }
}