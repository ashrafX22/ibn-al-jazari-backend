import { Injectable } from '@nestjs/common';
import { GoogleMeetingService } from '../providers/google/google-meeting.service';
import { IMeetingService } from '../interfaces/meeting-service.interface';
import { MeetingProvider } from '../enums/meeting-provider.enum';
@Injectable()
export class MeetingServiceFactory {
    constructor(
        private readonly googleMeetingService: GoogleMeetingService,
        // Add other services as needed
    ) { }

    getMeetingService(provider: string): IMeetingService {
        switch (provider) {
            case MeetingProvider.GOOGLE:
                return this.googleMeetingService;
            // Add cases for other providers
            default:
                throw new Error('Unsupported meeting provider');
        }
    }
}