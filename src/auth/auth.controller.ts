import { Body, Controller, Get, Post, Req, Res, Session, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard, GoogleAuthGuard, LocalAuthGuard } from './utils/guards';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { getUserSwaggerDoc, loginSwaggerDoc, logoutSwaggerDoc, redirectSwaggerDoc } from './auth.swagger-doc';
import { CreateStudentDto } from 'src/student/dto/create-student.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  async register(@Body() createStudentDto: CreateStudentDto) {
    return await this.authService.register(createStudentDto);
  }

  // pass username and password in a json object
  // using AuthGuard('local') directly does not serialize the user nor return a session id
  @UseGuards(LocalAuthGuard)
  @Post('local/login')
  async localLogin(@Req() req: Request) {
    return req.user;
  }

  // google auth steps
  // - google auth guard checks if the user is authenticated
  // - user authenticates if not authenticated
  // - redirects to the googleRedirect endpoint
  @loginSwaggerDoc()
  // using AuthGuard('google') directly does not serialize the user nor return a session id
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() { }

  // continue google auth steps
  // - again, google auth guard checks if the user is authenticated
  // - google strategy validates the authenticated user
  // - session serializer method saves the user info to session.passport.user
  // - redirection to the frontend
  // - user is deserialized (saved to req.user) upon subsequent requests
  @redirectSwaggerDoc()
  // using AuthGuard('google') directly does not serialize the user nor return a session id
  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  googleRedirect(@Res() res: Response) {
    res.redirect(process.env.ORIGIN);
  }

  // has access to the information of the whole session
  // accesses redis directly
  // session.passport.user is set by session serializer method
  // call this to retrieve user initial info returned from google
  @Get('session/user')
  getSessionUser(@Session() session: Record<string, any>) {
    console.log(session);
    console.log(session.id);
    return session.passport.user;
  }

  // only has access to the user information from req
  // req.user is set by session [de]serializer method which retrieves the user from db
  @getUserSwaggerDoc()
  @Get('req/user')
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
