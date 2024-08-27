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
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    classroomId: number;

    @Column()
    startTime: Date;

    @Column()
    link: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Classroom, (classroom) => classroom.meetings)
    @JoinColumn({ name: 'classroomId' })
    class: Classroom;
}
