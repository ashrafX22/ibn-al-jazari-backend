import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { Jwt } from 'src/modules/auth/jwt/jwt.interface';
import { IMeetingService } from '../../interfaces/meeting-service.interface';
import { GoogleTokenService } from 'src/modules/auth/providers/google/google-token.service';
import { MeetingDetails } from '../../interfaces/meeting-details.interface';

@Injectable()
export class GoogleMeetingService implements IMeetingService {
    private oauth2Client: OAuth2Client;

    constructor(private googleTokenService: GoogleTokenService) {
        this.oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            `${process.env.BACKEND_URL}/api/auth/google/callback`
        );
    }

    async createMeeting(creatorDetails: Jwt, meetingDetails: MeetingDetails) {
        const { email, googleAccessToken } = creatorDetails;
        console.log("create meeting");

        const validGoogleAccessToken =
            await this.googleTokenService.validateAndRefreshGoogleAccessToken(email, googleAccessToken);

        console.log("new google access token", validGoogleAccessToken);

        this.oauth2Client.setCredentials({ access_token: validGoogleAccessToken });
        const calendar = google.calendar({
            version: 'v3',
            auth: this.oauth2Client,
        });

        const { title, startTime, attendees } = meetingDetails;

        const event = {
            summary: title,
            // description: 'Meeting description',
            start: {
                // '2024-08-07T20:00:00+03:00'
                dateTime: startTime.toString(),
                timeZone: 'Africa/Cairo',
            },
            // end: {
            //     dateTime: startTime,
            //     timeZone: 'Africa/Cairo',
            // },
            // 'recurrence': [
            //     'RRULE:FREQ=DAILY;COUNT=1'
            // ],
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

        const response = await calendar.events.insert({
            calendarId: 'primary',
            requestBody: event,
            conferenceDataVersion: 1,
        });

        console.log('meeting created:', response.data);

        return response.data;
    }
}
