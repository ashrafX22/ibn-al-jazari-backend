import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Profile } from 'passport';
import { CreateStudentDto } from 'src/modules/student/dto/create-student.dto';
import { FinalizeStudentDto } from 'src/modules/student/dto/finalize-student-dto';
import { InitStudentDto } from 'src/modules/student/dto/init-student.dto';
import { StudentService } from 'src/modules/student/student.service';
import { UserService } from 'src/modules/user/user.service';


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private studentService: StudentService,
    private jwtService: JwtService
  ) { }

  async localValidateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    console.log("user", user);

    if (!user) throw new NotFoundException('user not found');

    if (user.password === password)
      return user;
    else
      throw new UnauthorizedException('invalid credintials');
  }

  async localLogin(user: any) {
    const payload = { email: user.email, role: user.role };
    return {
      jwt: this.jwtService.sign(payload),
    };
  }

  async localRegister(createStudentDto: CreateStudentDto) {
    return await this.studentService.create(createStudentDto);
  }

  async googleAuth(accessToken: string, refreshToken: string, profile: Profile) {
    console.log('auth service');

    const email = profile.emails[0].value;
    refreshToken = refreshToken || '';

    // login teacher or student
    const user = await this.userService.findByEmail(email);

    let result = null;

    if (user) {
      result = await this.userService.update(user.id, {
        accessToken,
        refreshToken,
      });

      console.log('google auth update user', result);

      result = { ...result, isNew: false };
    }
    // register student only
    else {
      result = {
        accessToken,
        refreshToken,
        email,
        isNew: true
      };
    }

    return result;
  }

  async googleRegister(initStudentDto: InitStudentDto, finalizeStudentDto: FinalizeStudentDto) {
    console.log('initStudentDto', initStudentDto);
    console.log('finalizeStudentDto', finalizeStudentDto);
    const createStudentDto = { ...initStudentDto, ...finalizeStudentDto };
    console.log('createStudentDto', createStudentDto);
    return await this.studentService.create(createStudentDto);
  }

  async getUser(email: string) {
    const user = this.userService.findByEmail(email);

    if (!user) throw new NotFoundException('user not found');

    return user;
  }
}
