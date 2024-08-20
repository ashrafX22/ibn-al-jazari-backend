import { Injectable } from '@nestjs/common';
import { Profile } from 'passport';
import { CreateStudentDto } from 'src/student/dto/create-student.dto';
import { StudentService } from 'src/student/student.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private studentService: StudentService) { }

  // login
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (user && user.common.password === password) {
      const { common, ...specific } = user;
      const { password, ...general } = common;

      return {
        ...specific,
        common: general,
      };
    }

    return null;
  }

  async register(createStudentDto: CreateStudentDto) {
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

  async getUser(id: number) {
    return this.userService.findOne(id);
  }
}
