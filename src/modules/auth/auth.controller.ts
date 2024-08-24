import { Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Post, Req, Res, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthenticatedGuard, GoogleAuthGuard, JwtAuthGuard, LocalAuthGuard } from './utils/guards';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { getUserSwaggerDoc, googleLoginSwaggerDoc, logoutSwaggerDoc, googleRedirectSwaggerDoc, LocalRegisterSwaggerDoc, localLoginSwaggerDoc, googleRegisterSwaggerDoc, getSessionUserSwaggerDoc } from './auth.swagger-doc';
import { CreateStudentDto } from 'src/modules/student/dto/create-student.dto';
import { AuthService } from './auth.service';
import { FinalizeStudentDto } from 'src/modules/student/dto/finalize-student-dto';

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
  // using AuthGuard('local') directly does not serialize the user nor return a session id
  @UseGuards(LocalAuthGuard)
  @Post('local/login')
  async localLogin(@Req() req: Request) {
    console.log("local login", req.user);
    return this.authService.LocalLogin(req.user);
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
  googleAuth() { }

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
  googleRedirect(@Session() session: Record<string, any>, @Res() res: Response) {
    console.log("google redirect session", session.passport.user);
    const isNew = session.passport.user?.isNew;
    const role = session.passport.user?.role;
    let redirectPage: string;

    if (isNew)
      redirectPage = "additional-info";
    else
      redirectPage = `${role}-home`;

    const redirectUrl = `${process.env.ORIGIN}/${redirectPage}/${session.id}`;
    console.log(redirectUrl);
    res.redirect(redirectUrl);
  }

  @googleRegisterSwaggerDoc()
  @Post('google/register')
  async googleRegister(@Session() session: Record<string, any>, @Body() finalizeStudentDto: FinalizeStudentDto) {
    console.log("google register");
    console.log("passport session", session.passport);

    if (!session.passport || !session.passport.user)
      throw new NotFoundException("user's google information not found");

    const initStudentDto = {
      email: session.passport.user['email'],
      accessToken: session.passport.user['accessToken'],
      refreshToken: session.passport.user['refreshToken'],
    }

    const student = await this.authService.googleRegister(initStudentDto, finalizeStudentDto);

    session.passport.user.role = "student";
    session.passport.user.isNew = "false";
    console.log("updated sesssion", session.passport.user);

    return student;
  }

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
