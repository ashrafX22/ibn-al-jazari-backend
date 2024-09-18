import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Classroom } from './classroom.entity';
import { Day } from '../enums/day.enum';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  classroomId: string;

  @Column()
  day: Day;

  @Column({
    type: 'time',
  })
  startTime: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => Classroom, (classroom) => classroom.appointments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'classroomId' })
  classroom: Classroom;
}
