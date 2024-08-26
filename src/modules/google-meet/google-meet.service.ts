import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { CreateGoogleMeetDto } from './dto/create-google-meet.dto';
import { AuthService } from '../auth/auth.service';
import { Jwt } from '../auth/utils/jwt.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GoogleMeetService {
  private oauth2Client: OAuth2Client;

  constructor(private authService: AuthService, private jwtService: JwtService) {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.BACKEND_URL}/api/auth/google/callback`
    );
  }

  async createMeeting(
    decryptedJwt: Jwt,
    createGoogleMeetDto: CreateGoogleMeetDto,
  ) {
    console.log("create meeting");

    const { email, role, experience, googleAccessToken } = decryptedJwt;
    console.log(googleAccessToken);

    let validGoogleAccessToken: string = googleAccessToken;

    console.log("old google access token", validGoogleAccessToken);

    if (googleAccessToken) {
      const isValidGoogleAccessToken = await this.authService.validateGoogleAccessToken(googleAccessToken);
      console.log("isValidGoogleAcessToken", isValidGoogleAccessToken);
      if (!isValidGoogleAccessToken)
        validGoogleAccessToken = await this.authService.refreshGoogleAccessToken(email);
    }

    console.log("new google access token", validGoogleAccessToken);

    this.oauth2Client.setCredentials({ access_token: validGoogleAccessToken });
    const calendar = google.calendar({
      version: 'v3',
      auth: this.oauth2Client,
    });

    const { summary, description, startDate, endDate, attendees } =
      createGoogleMeetDto;

    const event = {
      summary: summary,
      // 'location': '',
      description: description,
      start: {
        // '2024-08-07T20:00:00+03:00'
        dateTime: startDate,
        timeZone: 'Africa/Cairo',
      },
      end: {
        dateTime: endDate,
        timeZone: 'Africa/Cairo',
      },
      // 'recurrence': [
      //     'RRULE:FREQ=DAILY;COUNT=1'
      // ],
      attendees: attendees.map((email) => ({ email })),
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 10 },
        ],
      },
      conferenceData: {
        createRequest: {
          requestId: 'some-random-string', // Generate a unique string for each request
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      },
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      conferenceDataVersion: 1,
    });

    console.log('meeting created:', response.data);

    const payload: Jwt = {
      email,
      role,
      experience,
      googleAccessToken: validGoogleAccessToken
    };

    console.log(payload);

    const jwt = this.jwtService.sign(payload);

    return { jwt: jwt };
  }
}
