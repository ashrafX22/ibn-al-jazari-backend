import { Body, ClassSerializerInterceptor, Controller, Get, InternalServerErrorException, Post, Req, Res, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthenticatedGuard, GoogleAuthGuard, LocalAuthGuard } from './utils/guards';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { getUserSwaggerDoc, googleLoginSwaggerDoc as googleLoginSwaggerDoc, logoutSwaggerDoc, googleRedirectSwaggerDoc as googleRedirectSwaggerDoc, LocalRegisterSwaggerDoc, localLoginSwaggerDoc, googleRegisterSwaggerDoc, getSessionUserSwaggerDoc } from './auth.swagger-doc';
import { CreateStudentDto } from 'src/student/dto/create-student.dto';
import { AuthService } from './auth.service';
import { FinalizeStudentDto } from 'src/student/dto/finalize-student-dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @LocalRegisterSwaggerDoc()
  @Post('local/register')
  async localRegister(@Body() createStudentDto: CreateStudentDto) {
    return await this.authService.localRegister(createStudentDto);
  }

  // pass username and password in a json object
  @localLoginSwaggerDoc()
  // using AuthGuard('local') directly does not serialize the user nor return a session id
  @UseGuards(LocalAuthGuard)
  @Post('local/login')
  async localLogin(@Req() req: Request) {
    console.log("local login", req.user);
    return req.user;
  }

  // google auth steps
  // - google auth guard checks if the user is authenticated
  // - user authenticates if not authenticated
  // - redirects to the googleRedirect endpoint
  @googleLoginSwaggerDoc()
  // using AuthGuard('google') directly does not serialize the user nor return a session id
  // @UseGuards(AuthGuard('google'))
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() { }

  // continue google auth steps
  // - again, google auth guard checks if the user is authenticated
  // - google strategy validates the authenticated user
  // - session serializer method saves the user info to session.passport.user
  // - redirection to the frontend
  // - user is deserialized (saved to req.user) upon subsequent requests
  @googleRedirectSwaggerDoc()
  // using AuthGuard('google') directly does not serialize the user nor return a session id
  // @UseGuards(AuthGuard('google'))
  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  googleRedirect(@Res() res: Response) {
    res.redirect(process.env.ORIGIN);
  }

  @googleRegisterSwaggerDoc()
  @Post('google/register')
  async googleRegister(@Req() req: Request, @Session() session: Record<string, any>, @Body() finalizeStudentDto: FinalizeStudentDto) {
    console.log("google register");
    console.log("passport session", session.passport);

    const initStudentDto = {
      email: session.passport.user['email'],
      accessToken: session.passport.user['accessToken'],
      refreshToken: session.passport.user['refreshToken'],
    }

    const student = await this.authService.googleRegister(initStudentDto, finalizeStudentDto);

    return student;
  }

  // has access to the information of the whole session
  // accesses redis directly
  // session.passport.user is set by session serializer method
  // call this to retrieve user initial info returned from google
  @getSessionUserSwaggerDoc()
  @Get('session/user')
  getSessionUser(@Session() session: Record<string, any>) {
    console.log("session/user endpoint");
    console.log(session);
    console.log(session.id);
    return session.passport.user;
  }

  // only has access to the user information from req
  // req.user is set by session [de]serializer method which retrieves the user from db
  @getUserSwaggerDoc()
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
