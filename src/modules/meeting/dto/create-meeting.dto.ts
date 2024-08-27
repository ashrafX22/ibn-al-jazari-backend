import { ApiProperty } from "@nestjs/swagger";
import { MeetingProvider } from "../enums/meeting-provider.enum";

export class CreateMeetingDto {
    @ApiProperty()
    startTime: Date;

    @ApiProperty()
    provider: MeetingProvider;
}
