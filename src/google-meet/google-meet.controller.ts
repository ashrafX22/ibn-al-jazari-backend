import { Body, Controller, Post, Req } from '@nestjs/common';
import { GoogleMeetService } from './google-meet.service';
import { Request } from 'express'
import { CreateGoogleMeetDto } from './dto/create-google-meet.dto';

@Controller('google-meet')
export class GoogleMeetController {
  constructor(private readonly googleMeetService: GoogleMeetService) { }

  @Post('create')
  async createMeeting(@Req() req: Request, @Body() createGoogleMeetDto: CreateGoogleMeetDto) {
    const accessToken = req.user['accessToken'];
    const meeting = await this.googleMeetService.createMeeting(accessToken, createGoogleMeetDto);
    return meeting;
  }
}
