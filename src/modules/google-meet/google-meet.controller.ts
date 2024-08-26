import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { GoogleMeetService } from './google-meet.service';
import { CreateGoogleMeetDto } from './dto/create-google-meet.dto';
import { ExperienceGuard, JwtAuthGuard, RolesGuard } from 'src/modules/auth/utils/guards';
import { Experiences, Roles } from 'src/modules/auth/utils/roles.decorator';
import { createMeetingSwaggerDoc } from './google-meet.swagger-doc';
import { ApiTags } from '@nestjs/swagger';
import { Experience } from 'src/models/enums/experience.enum';
import { Role } from 'src/models/enums/role.enum';

@ApiTags('google-meet')
@Controller('google-meet')
export class GoogleMeetController {
  constructor(private readonly googleMeetService: GoogleMeetService) { }

  @createMeetingSwaggerDoc()
  // @Experiences(Experience.SENIOR)
  // @Roles(Role.TEAHCER)
  @UseGuards(JwtAuthGuard) // , RolesGuard, ExperienceGuard
  @Post('create')
  async createMeeting(@Req() req, @Body() createGoogleMeetDto: CreateGoogleMeetDto) {
    console.log("create meeting", req.user);
    return await this.googleMeetService.createMeeting(req.user.email, req.user.googleAccessToken, createGoogleMeetDto);
  }
}
