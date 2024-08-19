import { Body, Controller, Get, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard, GoogleAuthGuard } from './utils/guards';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { getUserSwaggerDoc, loginSwaggerDoc, logoutSwaggerDoc, redirectSwaggerDoc } from './auth.swagger-doc';
import { AuthGuard } from '@nestjs/passport';
import { CreateStudentDto } from 'src/student/dto/create-student.dto';
import { AuthService } from './auth.service';
import { StudentFollowDto } from 'src/student/dto/student-follow.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: Request) {
    return req.user;
  }

  @Post('register')
  async register(@Body() createStudentDto: CreateStudentDto) {
    return await this.authService.localRegister(createStudentDto);
  }

  @loginSwaggerDoc()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() { }

  @redirectSwaggerDoc()
  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  googleRedirect(@Res() res: Response) {
    // TODO: set the redirection url to the frontend
    res.redirect(process.env.ORIGIN);
    // TODO: return the user
  }

  @Patch('google/follow/:id')
  async googleFollow(@Param('id') id: string, @Body() studentFollowDto: StudentFollowDto) {
    return this.authService.googleFollow(+id, studentFollowDto);
  }

  // only returns the user information
  // retrieves the user from req which is set by Passport after successful authentication
  @getUserSwaggerDoc()
  @Get('user')
  getUser(@Req() req: Request) {
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


  // similar to getUser
  // returns the information of the whole session
  // accesses redis directly
  // @Get('')
  // getAuthSession(@Session() session: Record<string, any>) {
  //   console.log(session);
  //   console.log(session.id);
  //   return session.passport.user;
  // }
}
