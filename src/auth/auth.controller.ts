import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './utils/guards';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import {
  getUserSwaggerDoc,
  loginSwaggerDoc,
  logoutSwaggerDoc,
  redirectSwaggerDoc,
} from './auth.swagger-doc';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  // @Post('local/register')
  // localRegister(createUserDto: CreateUserDto) {
  //   return this.authService.localRegister(createUserDto);
  // }

  @loginSwaggerDoc()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  login() { }

  @redirectSwaggerDoc()
  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  redirect(@Res() res: Response) {
    // TODO: set the redirection url to the frontend
    res.redirect(process.env.ORIGIN);
  }

  // only returns the user information
  // retrieves the user from req which is set by Passport after successful authentication
  @getUserSwaggerDoc()
  @Get('user')
  getUser(@Req() req: Request) {
    return req.user;
  }

  @logoutSwaggerDoc()
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
