import { Injectable } from '@nestjs/common';
import { Profile } from 'passport';
import { CreateStudentDto } from 'src/student/dto/create-student.dto';
import { FinalizeStudentDto } from 'src/student/dto/finalize-student-dto';
import { InitStudentDto } from 'src/student/dto/init-student.dto';
import { StudentService } from 'src/student/student.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private studentService: StudentService) { }

  // local login
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    console.log("user", user);
    console.log("user password", user.password);

    if (user && user.password === password)
      return user;

    return null;
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
    return this.userService.findByEmail(email);
  }
}
