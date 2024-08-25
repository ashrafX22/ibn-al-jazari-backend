import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { GoogleMeetService } from './google-meet.service';
import { Request } from 'express'
import { CreateGoogleMeetDto } from './dto/create-google-meet.dto';
import { AuthenticatedGuard, RolesGuard } from 'src/modules/auth/utils/guards';
import { Roles } from 'src/modules/auth/utils/roles.decorator';
import { createMeetingSwaggerDoc } from './google-meet.swagger-doc';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/models/enums/role.enum';

@ApiTags('google-meet')
@Controller('google-meet')
export class GoogleMeetController {
  constructor(private readonly googleMeetService: GoogleMeetService) { }

  @createMeetingSwaggerDoc()
  @Roles(Role.SENIOR)
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Post('create')
  async createMeeting(@Req() req: Request, @Body() createGoogleMeetDto: CreateGoogleMeetDto) {
    const accessToken = req.user['accessToken'];
    const meeting = await this.googleMeetService.createMeeting(accessToken, createGoogleMeetDto);
    return meeting;
  }
}
