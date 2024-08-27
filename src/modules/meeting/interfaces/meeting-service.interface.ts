import { Jwt } from "src/modules/auth/jwt/jwt.interface";
import { MeetingDetails } from "./meeting-details.interface";

export interface IMeetingService {
    createMeeting(creatorDetails: Jwt, meetingDetails: MeetingDetails);
}