import { Body, ClassSerializerInterceptor, Controller, Get, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from './utils/guards';
import { ApiTags } from '@nestjs/swagger';
import { getUserSwaggerDoc, googleAuthSwaggerDoc, googleAuthCallbackSwaggerDoc, LocalRegisterSwaggerDoc, localLoginSwaggerDoc, googleRegisterSwaggerDoc } from './auth.swagger-doc';
import { CreateStudentDto } from 'src/modules/student/dto/create-student.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) { }

  // pass username and password in a json object
  @localLoginSwaggerDoc()
  @UseGuards(AuthGuard('local'))
  @Post('local/login')
  async localLogin(@Req() req) {
    console.log("local login", req.user);
    return this.authService.localLogin(req.user);
  }

  @LocalRegisterSwaggerDoc()
  @Post('local/register')
  async localRegister(@Body() createStudentDto: CreateStudentDto) {
    return await this.authService.localRegister(createStudentDto);
  }

  // google auth steps
  // - google auth guard checks if the user is authenticated
  // - user authenticates if not authenticated
  // - redirects to the googleRedirect endpoint
  @googleAuthSwaggerDoc()
  @UseGuards(AuthGuard('google-auth'))
  @Get('google')
  googleAuth() { }

  // continue google auth steps
  // - again, google auth guard checks if the user is authenticated
  // - google strategy validates the authenticated user
  // - user is saved to req.user upon subsequent requests
  // - redirection to the frontend
  @googleAuthCallbackSwaggerDoc()
  @UseGuards(AuthGuard('google-auth'))
  @Get('google/callback')
  async googleAuthCallback(@Req() req, @Res() res) {
    console.log("google login redirect");
    console.log(req.user);
    const result = await this.authService.googleAuth(req.user);
    const { newAccount } = result;

    // google login
    if (!newAccount) {
      const { role, jwt } = result;
      const queryParams = new URLSearchParams({
        jwt: jwt,
      }).toString();
      return res.redirect(`${process.env.ORIGIN}/${role}-home?${queryParams}`);
    }
    // google register
    else {
      const queryParams = new URLSearchParams({
        email: req.user.email,
        googleAccessToken: req.user.googleAccessToken,
        googleRefreshToken: req.user.googleRefreshToken,
      }).toString();
      return res.redirect(`${process.env.ORIGIN}/additional-info?${queryParams}`);
    }
  }

  @googleRegisterSwaggerDoc()
  @Post('/google/register')
  async googleRegister(@Body() createStudentDto: CreateStudentDto) {
    return await this.authService.googleRegister(createStudentDto);
  }

  @getUserSwaggerDoc()
  @UseGuards(JwtAuthGuard)
  @Get('user')
  getUser(@Req() req) {
    console.log("req user", req.user);
    return req.user;
  }
}
