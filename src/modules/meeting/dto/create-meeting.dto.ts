import { ApiProperty } from "@nestjs/swagger";
import { MeetingProvider } from "../enums/meeting-provider.enum";

export class CreateMeetingDto {
    @ApiProperty()
    provider: MeetingProvider;
}
