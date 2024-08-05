import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './utils/guards';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  login() { }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  redirect(@Res() res: Response) {
    // TODO: set the redirection url to the frontend
    res.redirect('');
  }

  // only returns the user information
  // retrieves the user from req which is set by Passport after successful authentication
  @Get('user')
  getUser(@Req() req: Request) {
    return req.user;
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    // TODO: set logout redirection url to the frontend
    req.logout(() => {
      res.redirect('');
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
