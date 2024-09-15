import { AppointmentEntity } from 'src/modules/appointment/entities/appointment.entity';

export interface MeetingDetails {
  title: string;

  appointments: AppointmentEntity[];

  attendees: string[];
}
