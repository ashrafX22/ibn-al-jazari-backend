import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
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

  @OneToOne(() => Classroom, {
    onDelete: 'CASCADE', // When a classroom is deleted, the meeting is also deleted
  })
  @JoinColumn()
  class: Classroom;
}
