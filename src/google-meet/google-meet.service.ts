import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { CreateGoogleMeetDto } from './dto/create-google-meet.dto';

@Injectable()
export class GoogleMeetService {
    private oauth2Client: OAuth2Client;

    constructor() {
        this.oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            'http://localhost:3000/api/auth/google/callback',
            // TODO: test it with this url: 'http://localhost:3000/api/auth/google/redirect'
        );
    }

    async createMeeting(accessToken: string, createGoogleMeetDto: CreateGoogleMeetDto) {
        this.oauth2Client.setCredentials({ access_token: accessToken });
        const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });

        const { summary, description, startDate, endDate, attendees } = createGoogleMeetDto;

        const event = {
            'summary': summary,
            // 'location': '',
            'description': description,
            'start': {
                // '2024-08-07T20:00:00+03:00'
                'dateTime': startDate,
                'timeZone': 'Africa/Cairo',
            },
            'end': {
                'dateTime': endDate,
                'timeZone': 'Africa/Cairo',
            },
            // 'recurrence': [
            //     'RRULE:FREQ=DAILY;COUNT=1'
            // ],
            'attendees': attendees.map(email => ({ email })),
            'reminders': {
                'useDefault': false,
                'overrides': [
                    { 'method': 'email', 'minutes': 24 * 60 },
                    { 'method': 'popup', 'minutes': 10 },
                ],
            },
            conferenceData: {
                createRequest: {
                    requestId: 'some-random-string', // Generate a unique string for each request
                    conferenceSolutionKey: {
                        type: 'hangoutsMeet'
                    },
                }
            }
        };

        const response = await calendar.events.insert({
            calendarId: 'primary',
            requestBody: event,
            conferenceDataVersion: 1,
        });

        console.log("meeting created:", response.data);

        return response.data;
    }
}
