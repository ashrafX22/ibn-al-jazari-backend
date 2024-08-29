import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Classroom } from "./classroom.entity";
import { Day } from "../enums/day.enum";


@Entity()
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    classroomId: number;

    @Column()
    day: Day;

    @Column()
    startTime: string;

    @ManyToOne(() => Classroom, (classroom) => classroom.appointments)
    @JoinColumn({ name: 'classroomId' })
    classroom: Classroom;
}