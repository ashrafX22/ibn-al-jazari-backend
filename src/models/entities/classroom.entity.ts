import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { Teacher } from './teacher.entity';
import { Meeting } from './meeting.entity';
import { Enrollment } from './enrollment.entity';
import { Payment } from './payment.entity';

@Entity()
export class Classroom {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    subjectId: number;

    @Column()
    startTime: Date;

    @Column()
    endTime: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Teacher, (teacher) => teacher.classrooms)
    teacher: Teacher;

    @OneToMany(() => Meeting, (meeting) => meeting.class)
    meetings: Meeting[];

    @OneToMany(() => Enrollment, (enrollment) => enrollment.classroom)
    enrollments: Enrollment[];

    @OneToMany(() => Payment, (payment) => payment.classroom)
    payments: Payment[];
}
