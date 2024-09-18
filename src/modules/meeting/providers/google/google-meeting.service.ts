import { BadRequestException, Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { Jwt } from 'src/modules/auth/jwt/jwt.interface';
import { IMeetingService } from '../../interfaces/meeting-service.interface';
import { CreateMeetingDetails } from '../../interfaces/create-meeting-details.interface';
import {
  addHoursToDateTime,
  combineDateAndTime,
  getNextDateForDay,
} from 'src/shared/utils/dateTime.util';
import { ProviderMeetingDetails } from '../../interfaces/provider-meeting-details.interface';

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

  async createMeeting(
    creatorDetails: Jwt,
    meetingDetails: CreateMeetingDetails,
  ) {
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
    const appointment = appointments[0];

    // Get the next occurrence of the appointment's day
    const nextDate = getNextDateForDay(appointment.day);

    // Combine the next date with the startTime
    const startDateTime = combineDateAndTime(nextDate, appointment.startTime);

    // Set the end date-time (e.g., 1 hour after start)
    const endDateTime = combineDateAndTime(
      nextDate,

      //TODO: make this dynamic, leave it up the teacher to choose the duration of the meeting.
      addHoursToDateTime(appointment.startTime, 1),
    );

    const event = {
      summary: title,
      // description: 'Meeting description',
      start: {
        // google converts whatever timezone you give to the timeZone variable you passed
        // '2024-08-31T18:00:00+03:00'
        dateTime: startDateTime,
        timeZone: 'Africa/Cairo',
      },
      end: {
        // '2024-08-31T18:00:00+03:00'
        dateTime: endDateTime,
        timeZone: 'Africa/Cairo',
      },
      recurrence: [
        // 'RRULE:FREQ=DAILY;COUNT=1'
        `RRULE:FREQ=WEEKLY;BYDAY=${days}`,
      ],
      attendees: attendees.map((attendee: any) => attendee.email),
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

  getProviderMeetingDetails(providerMeeting: any): ProviderMeetingDetails {
    return { id: providerMeeting.id, link: providerMeeting.hangoutLink };
  }

  async deleteMeeting(
    creatorDetails: Jwt,
    meetingProviderId: string,
  ): Promise<void> {
    const { googleAccessToken } = creatorDetails;

    this.oauth2Client.setCredentials({ access_token: googleAccessToken });
    const calendar = google.calendar({
      version: 'v3',
      auth: this.oauth2Client,
    });

    try {
      await calendar.events.delete({
        calendarId: 'primary',
        eventId: meetingProviderId,
      });
      console.log(`Event ${meetingProviderId} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting event:', error);
      throw new Error('Unable to delete event');
    }
  }
}
