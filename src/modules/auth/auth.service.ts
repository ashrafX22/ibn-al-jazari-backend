import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateStudentDto } from 'src/modules/student/dto/create-student.dto';
import { StudentService } from 'src/modules/student/student.service';
import { UserService } from 'src/modules/user/user.service';
import { TeacherEntity } from '../teacher/entities/teacher.entity';
import { UnionUserEntity } from '../user/types/user.type';
import { Jwt } from './utils/jwt.interface';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private httpService: HttpService,
    private userService: UserService,
    private studentService: StudentService,
  ) { }

  async getUser(email: string) {
    const user = this.userService.findByEmail(email);

    if (!user) throw new NotFoundException('user not found');

    return user;
  }

  async localValidateUser(email: string, password: string): Promise<UnionUserEntity | NotFoundException | UnauthorizedException> {
    const user = await this.userService.findByEmail(email);
    console.log("user", user);

    if (!user) throw new NotFoundException('user not found');

    if (user.password === password)
      return user;
    else
      throw new UnauthorizedException('invalid credintials');
  }

  async localLogin(user: UnionUserEntity) {
    const payload: Jwt = { email: user.email, role: user.role };
    if (user instanceof TeacherEntity) payload.experience = user.experience;
    return {
      jwt: this.jwtService.sign(payload),
    };
  }

  async localRegister(createStudentDto: CreateStudentDto) {
    return await this.studentService.create(createStudentDto);
  }

  async googleAuth(googleInfo: any) {
    const { email, googleAccessToken, googleRefreshToken } = googleInfo;
    const user = await this.userService.findByEmail(email);
    if (user) {
      console.log("same google refresh token?", user.googleRefreshToken === googleRefreshToken);
      const result = await this.userService.update(user.id, { googleRefreshToken: googleRefreshToken });
      console.log("same google refresh token after user update?", user.googleRefreshToken === result.googleRefreshToken);

      let payload: Jwt = { email: user.email, role: user.role, googleAccessToken: googleAccessToken };

      if (user instanceof TeacherEntity)
        payload = { ...payload, experience: user.experience };

      return {
        newAccount: false,
        role: user.role,
        jwt: this.jwtService.sign(payload)
      };
    }
    else
      return { newAccount: true };
  }

  async googleRegister(createStudentDto: CreateStudentDto) {
    const student = await this.studentService.create({
      ...createStudentDto
    });

    const payload: Jwt = {
      email: student.email,
      role: student.role,
      googleAccessToken: createStudentDto.googleAccessToken
    };

    const jwt = this.jwtService.sign(payload);

    return { jwt: jwt };
  }

  async validateGoogleAccessToken(token: string): Promise<boolean> {
    console.log("verify google token");
    try {
      const url = `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`;

      const response = await firstValueFrom(this.httpService.get(url));

      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  async refreshGoogleAccessToken(email: string): Promise<string> {
    console.log("refreshGoogleAccessToken");

    const user = await this.userService.findByEmail(email);

    if (!user || !user.googleRefreshToken)
      throw new UnauthorizedException('No refresh token available. Please log in again.');

    const tokenUrl = 'https://oauth2.googleapis.com/token';
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: user.googleRefreshToken,
      grant_type: 'refresh_token',
    });

    console.log("refreshGoogleAccessToken refresh token", user.googleRefreshToken);

    try {
      const response = await firstValueFrom(
        this.httpService.post(tokenUrl, params.toString(), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }),
      );

      const { access_token } = response.data;

      return access_token;
    } catch (error) {
      throw new UnauthorizedException('Failed to refresh access token. Please log in again.');
    }
  }
}