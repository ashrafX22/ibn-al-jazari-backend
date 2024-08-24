import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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

  async googleAuth(email: string) {
    const user = await this.userService.findByEmail(email);
    if (user)
      return { newAccount: false, role: user.role, jwt: this.jwtService.sign({ email: user.email, role: user.role }) };
    else
      return { newAccount: true };
  }

  async googleRegister(createStudentDto: CreateStudentDto) {
    const student = await this.studentService.create({
      ...createStudentDto
    });

    const jwt = this.jwtService.sign({ email: student.email, role: student.role });
    return { role: student.role, jwt: jwt };
  }

  async getUser(email: string) {
    const user = this.userService.findByEmail(email);

    if (!user) throw new NotFoundException('user not found');

    return user;
  }
}
