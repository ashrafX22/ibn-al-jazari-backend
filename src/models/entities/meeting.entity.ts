import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Classroom } from './classroom.entity';

@Entity()
export class Meeting {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  link: string;

  @Column({ unique: true })
  classroomId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Classroom, (classroom) => classroom.meetings)
  @JoinColumn({ name: 'classroomId' })
  class: Classroom;
}
