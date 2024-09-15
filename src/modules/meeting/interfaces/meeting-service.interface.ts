import { Jwt } from "src/modules/auth/jwt/jwt.interface";
import { CreateMeetingDetails } from "./create-meeting-details.interface";
import { ProviderMeetingDetails } from "./provider-meeting-details.interface";

export interface IMeetingService {
    createMeeting(creatorDetails: Jwt, meetingDetails: CreateMeetingDetails);
    getProviderMeetingDetails(providerMeeting: any): ProviderMeetingDetails;
    deleteMeeting(creatorDetails: Jwt, meetingProviderId: string): Promise<void>;
}