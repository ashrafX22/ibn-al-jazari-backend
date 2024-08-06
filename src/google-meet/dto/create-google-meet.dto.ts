export class CreateGoogleMeetDto {
    summary: string;
    description?: string;
    // TODO: use isostring format
    startDate: string;
    endDate: string;
    attendees: string[];
}