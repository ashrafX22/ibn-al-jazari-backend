import { Module } from '@nestjs/common';
import { GoogleMeetService } from './google-meet.service';
import { GoogleMeetController } from './google-meet.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [GoogleMeetController],
  providers: [GoogleMeetService],
})
export class GoogleMeetModule { }
