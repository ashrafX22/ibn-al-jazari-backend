import { BadRequestException, Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { Jwt } from 'src/modules/auth/jwt/jwt.interface';
import { IMeetingService } from '../../interfaces/meeting-service.interface';
import { MeetingDetails } from '../../interfaces/meeting-details.interface';
import { addHoursToDateTime } from 'src/shared/utils/add-hours.util';

@Injectable()
export class GoogleMeetingService implements IMeetingService {
  private oauth2Client: OAuth2Client;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.BACKEND_URL}/api/auth/google/callback`,
    );
  }

  async createMeeting(creatorDetails: Jwt, meetingDetails: MeetingDetails) {
    const { googleAccessToken } = creatorDetails;
    console.log('GoogleMeetingService createMeeting');

    this.oauth2Client.setCredentials({ access_token: googleAccessToken });
    const calendar = google.calendar({
      version: 'v3',
      auth: this.oauth2Client,
    });

    const { title, appointments, attendees } = meetingDetails;

    const daysArray = appointments.map((appointment) =>
      appointment.day.substring(0, 2).toUpperCase(),
    );
    const days = daysArray.join();

    // TODO: validate that there are appointmetns
    const startTime = appointments[0].startTime;

    const event = {
      summary: title,
      // description: 'Meeting description',
      start: {
        // google converts whatever timezone you give to the timeZone variable you passed
        // '2024-08-31T18:00:00+03:00'
        dateTime: startTime, // startTime,
        timeZone: 'Africa/Cairo',
      },
      end: {
        // '2024-08-31T18:00:00+03:00'
        dateTime: addHoursToDateTime(startTime, 1),
        timeZone: 'Africa/Cairo',
      },
      recurrence: [
        // 'RRULE:FREQ=DAILY;COUNT=1'
        `RRULE:FREQ=WEEKLY;BYDAY=${days}`,
      ],
      attendees: attendees.map((email) => ({ email })),
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 30 },
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

    try {
      const response = await calendar.events.insert({
        calendarId: 'primary',
        requestBody: event,
        conferenceDataVersion: 1,
      });

      console.log('meeting created:', response.data);

      return response.data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  getMeetingLink(providerMeeting: any): string {
    return providerMeeting.hangoutLink;
  }
}
