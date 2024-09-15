import { AppointmentEntity } from 'src/modules/appointment/entities/appointment.entity';

export interface CreateMeetingDetails {
  title: string;

  appointments: AppointmentEntity[];

  attendees: string[];
}
