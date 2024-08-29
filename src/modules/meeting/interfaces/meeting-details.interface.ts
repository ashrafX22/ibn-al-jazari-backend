import { Appointment } from "src/models/entities/appointment.entity";
import { Day } from "src/models/enums/day.enum";

export interface MeetingDetails {
    title: string;

    appointments: Appointment[];

    attendees: string[];
}