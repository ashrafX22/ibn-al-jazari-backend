import { Body, ClassSerializerInterceptor, Controller, Get, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { GoogleAuthGuard } from './providers/google/guards/google.guard';
import { ApiTags } from '@nestjs/swagger';
import { getUserSwaggerDoc, googleAuthSwaggerDoc, googleAuthCallbackSwaggerDoc, LocalRegisterSwaggerDoc, localLoginSwaggerDoc, googleRegisterSwaggerDoc } from './auth.swagger-doc';
import { CreateStudentDto } from 'src/modules/student/dto/create-student.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthService } from './providers/google/google-auth.service';

@ApiTags('auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService, private googleAuthService: GoogleAuthService) { }

  @getUserSwaggerDoc()
  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  getUser(@Req() req) {
    return this.authService.getUser(req.user.email);
  }

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
  @UseGuards(GoogleAuthGuard)
  @Get('google')
  googleAuth() { }

  // continue google auth steps
  // - again, google auth guard checks if the user is authenticated
  // - google strategy validates the authenticated user
  // - user is saved to req.user upon subsequent requests
  // - redirection to the frontend
  @googleAuthCallbackSwaggerDoc()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleAuthCallback(@Req() req, @Res() res) {
    console.log("google login redirect");
    console.log(req.user);
    const result = await this.googleAuthService.googleAuth(req.user);
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
    return await this.googleAuthService.googleRegister(createStudentDto);
  }
}
