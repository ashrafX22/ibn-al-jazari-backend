import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { GoogleMeetService } from './google-meet.service';
import { Request } from 'express'
import { CreateGoogleMeetDto } from './dto/create-google-meet.dto';
import { AuthenticatedGuard, RolesGuard } from 'src/auth/utils/guards';
import { Roles } from 'src/auth/utils/roles.decorator';
import { Role } from '@prisma/client';

@Controller('google-meet')
export class GoogleMeetController {
  constructor(private readonly googleMeetService: GoogleMeetService) { }

  @Roles(Role.SHEIKH)
  @UseGuards(AuthenticatedGuard, RolesGuard) @Post('create')
  async createMeeting(@Req() req: Request, @Body() createGoogleMeetDto: CreateGoogleMeetDto) {
    const accessToken = req.user['accessToken'];
    const meeting = await this.googleMeetService.createMeeting(accessToken, createGoogleMeetDto);
    return meeting;
  }
}
