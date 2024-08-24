import { Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthenticatedGuard, JwtAuthGuard } from './utils/guards';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { getUserSwaggerDoc, googleLoginSwaggerDoc, logoutSwaggerDoc, googleRedirectSwaggerDoc as googleLoginCallbackSwaggerDoc, LocalRegisterSwaggerDoc, localLoginSwaggerDoc, googleRegisterSwaggerDoc, getSessionUserSwaggerDoc } from './auth.swagger-doc';
import { CreateStudentDto } from 'src/modules/student/dto/create-student.dto';
import { AuthService } from './auth.service';
import { FinalizeStudentDto } from 'src/modules/student/dto/finalize-student-dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) { }

  @LocalRegisterSwaggerDoc()
  @Post('local/register')
  async localRegister(@Body() createStudentDto: CreateStudentDto) {
    return await this.authService.localRegister(createStudentDto);
  }

  // pass username and password in a json object
  @localLoginSwaggerDoc()
  @UseGuards(AuthGuard('local'))
  @Post('local/login')
  async localLogin(@Req() req) {
    console.log("local login", req.user);
    return this.authService.localLogin(req.user);
  }

  // google auth steps
  // - google auth guard checks if the user is authenticated
  // - user authenticates if not authenticated
  // - redirects to the googleRedirect endpoint
  @googleLoginSwaggerDoc()
  @UseGuards(AuthGuard('google-login'))
  @Get('google/login')
  googleLogin() { }

  // continue google auth steps
  // - again, google auth guard checks if the user is authenticated
  // - google strategy validates the authenticated user
  // - user is saved to req.user upon subsequent requests
  // - redirection to the frontend
  @googleLoginCallbackSwaggerDoc()
  @UseGuards(AuthGuard('google-login'))
  @Get('google/login/callback')
  async googleLoginCallback(@Req() req, @Res() res) {
    console.log("google login redirect");
    try {
      const { role, jwt } = await this.authService.googleLogin(req.user.email);
      console.log(role, jwt);
      return res.redirect(`${process.env.ORIGIN}/${role}-home}/${jwt}`);
    } catch (error) {
      return res.redirect(`${process.env.ORIGIN}/register`);
    }
  }

  // @googleRegisterSwaggerDoc()
  // @Post('google/register')
  // async googleRegister(@Session() session: Record<string, any>, @Body() finalizeStudentDto: FinalizeStudentDto) {
  //   console.log("google register");
  //   console.log("passport session", session.passport);

  //   if (!session.passport || !session.passport.user)
  //     throw new NotFoundException("user's google information not found");

  //   const initStudentDto = {
  //     email: session.passport.user['email'],
  //     accessToken: session.passport.user['accessToken'],
  //     refreshToken: session.passport.user['refreshToken'],
  //   }

  //   const student = await this.authService.googleRegister(initStudentDto, finalizeStudentDto);

  //   session.passport.user.role = "student";
  //   session.passport.user.isNew = "false";
  //   console.log("updated sesssion", session.passport.user);

  //   return student;
  // }

  @getUserSwaggerDoc()
  @UseGuards(JwtAuthGuard)
  @Get('user')
  getUser(@Req() req: Request) {
    console.log("req user", req.user);
    return req.user;
  }

  @logoutSwaggerDoc()
  @UseGuards(AuthenticatedGuard)
  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    // TODO: set logout redirection url to the frontend
    req.logout(() => {
      res.redirect(process.env.ORIGIN);
    });
  }
}
