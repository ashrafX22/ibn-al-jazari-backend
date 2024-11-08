import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GoogleAuthGuard } from './providers/google/google.guard';
import { ApiTags } from '@nestjs/swagger';
import {
  getUserSwaggerDoc,
  googleAuthSwaggerDoc,
  googleAuthCallbackSwaggerDoc,
  LocalRegisterSwaggerDoc,
  localLoginSwaggerDoc,
  googleRegisterStudentSwaggerDoc,
} from './auth.swagger';
import { CreateStudentDto } from 'src/modules/student/dto/create-student.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthProvider } from './providers/auth-provider.enum';
import { JwtAuthHeaderInterceptor } from './jwt/jwt-auth-header.interceptor';
import { PasswordHashInterceptor } from './interceptors/password-hash.interceptor';
import { PublicRoute } from './public-route/public-route.decorator';
import { Roles } from './decorators/roles.decorator';
import { Role } from 'src/models/enums/role.enum';
import { CreateTeacherDto } from '../teacher/dto/create-teacher.dto';

@ApiTags('auth')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @getUserSwaggerDoc()
  @Roles(Role.TEACHER, Role.STUDENT)
  @Get('me')
  async getUser(@Req() req) {
    return this.authService.getUser(req.user.id);
  }

  // pass username and password in a json object
  @localLoginSwaggerDoc()
  @PublicRoute()
  @UseGuards(AuthGuard('local'))
  @UseInterceptors(JwtAuthHeaderInterceptor)
  @Post('local/login')
  async localLogin(@Req() req) {
    const jwt = await this.authService.login(AuthProvider.LOCAL, req.user);
    return { message: 'success', jwt };
  }

  @LocalRegisterSwaggerDoc()
  // @UseInterceptors(PasswordHashInterceptor)
  @PublicRoute()
  @Post('local/register')
  async localRegister(@Body() createStudentDto: CreateStudentDto) {
    return await this.authService.registerStudent(
      AuthProvider.LOCAL,
      createStudentDto,
    );
  }

  // google auth steps
  // - google auth guard checks if the user is authenticated
  // - user authenticates if not authenticated
  // - redirects to the googleRedirect endpoint
  @googleAuthSwaggerDoc()
  @PublicRoute()
  @UseGuards(GoogleAuthGuard)
  @Get('google')
  googleAuth() {}

  // continue google auth steps
  // - again, google auth guard checks if the user is authenticated
  // - google strategy validates the authenticated user
  // - user is saved to req.user upon subsequent requests
  // - redirection to the frontend
  @googleAuthCallbackSwaggerDoc()
  @PublicRoute()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleAuthCallback(@Req() req, @Res() res) {
    console.log('google login redirect');
    console.log(req.user);

    const result: any = await this.authService.login(
      AuthProvider.GOOGLE,
      req.user,
    );

    const { unapprovedTeacher, newAccount } = result;
    if (unapprovedTeacher)
      return res.redirect(`${process.env.ORIGIN}/auth/login?unapprovedTeacher=true`);
    // google register
    if (newAccount) {
      const queryParams = new URLSearchParams({
        email: req.user.email,
        googleAccessToken: req.user.googleAccessToken,
        googleRefreshToken: req.user.googleRefreshToken,
      }).toString();
      return res.redirect(
        `${process.env.ORIGIN}/auth/register-additional?${queryParams}`,
      );
    }
    // google login
    else {
      const { jwt } = result;
      const queryParams = new URLSearchParams({
        jwt: jwt,
      }).toString();
      return res.redirect(`${process.env.ORIGIN}/auth/login?${queryParams}`);
    }
  }

  @googleRegisterStudentSwaggerDoc()
  @PublicRoute()
  @UseInterceptors(JwtAuthHeaderInterceptor)
  @Post('/google/register/student')
  async googleRegisterStudent(@Body() createStudentDto: CreateStudentDto) {
    const jwt = await this.authService.registerStudent(
      AuthProvider.GOOGLE,
      createStudentDto,
    );

    return { message: 'success', jwt };
  }

  @PublicRoute()
  @Post('/google/register/teacher')
  async googleRegisterTeacher(@Body() createTeacherDto: CreateTeacherDto) {
    const teacher = await this.authService.registerTeacher(
      AuthProvider.GOOGLE,
      createTeacherDto,
    );

    return { message: 'success' };
  }
}
