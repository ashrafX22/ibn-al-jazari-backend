import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { LocalAuthService } from './providers/local/local-auth.service';
import { GoogleAuthService } from './providers/google/google-auth.service';
import { CreateStudentDto } from '../student/dto/create-student.dto';
import { AuthProvider } from './providers/auth-provider.enum';


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private localAuthService: LocalAuthService,
    private googleAuthService: GoogleAuthService,
  ) { }

  async getUser(email: string) {
    const user = this.userService.findByEmail(email);

    if (!user) throw new NotFoundException('user not found');

    return user;
  }

  async login(strategy: string, credentials: any) {
    switch (strategy) {
      case AuthProvider.LOCAL:
        return this.localAuthService.localLogin(credentials);
      case AuthProvider.GOOGLE:
        return this.googleAuthService.googleAuth(credentials);
      default:
        throw new NotFoundException('Unsupported login method');
    }
    // Handle other strategies
  }

  async register(strategy: string, createStudentDto: CreateStudentDto) {
    switch (strategy) {
      case AuthProvider.LOCAL:
        return this.localAuthService.localRegister(createStudentDto);
      case AuthProvider.GOOGLE:
        return this.googleAuthService.googleRegister(createStudentDto);
      default:
        throw new NotFoundException('Unsupported registration method');
    }
    // Handle other strategies
  }
}