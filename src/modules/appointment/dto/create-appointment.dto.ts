import { ApiProperty } from "@nestjs/swagger";
import { Day } from "src/models/enums/day.enum";

export class CreateAppointmentDto {
    @ApiProperty()
    day: Day;

    @ApiProperty()
    startTime: string;
}
