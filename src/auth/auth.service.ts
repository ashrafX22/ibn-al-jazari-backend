import { Injectable } from '@nestjs/common';
import { TeacherService } from 'src/teacher/teacher.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private teacherService: TeacherService) { }

  // async localRegister(createUserDto: CreateUserDto) {
  //   return this.validateUser(createUserDto);
  // }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user && user.password && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async googleLogin(createUserDto: CreateUserDto) {
    console.log('auth service: google login');

    const { email } = createUserDto;

    const user = await this.userService.findByEmail(email);
    const teacher = await this.teacherService.findByEmail(email);

    if (!user && !teacher)
      return this.userService.upsert(createUserDto);

    console.log("user or teacher? ", user || teacher);
    return user || teacher;
  }

  async get(id: number) {
    return await this.userService.findOne(id);
  }
}
