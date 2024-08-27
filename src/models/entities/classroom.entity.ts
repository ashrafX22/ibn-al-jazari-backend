import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { Teacher } from './teacher.entity';
import { Meeting } from './meeting.entity';
import { Enrollment } from './enrollment.entity';
import { Payment } from './payment.entity';
import { Subject } from './subject.entity';

@Entity()
export class Classroom {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    teacherId: number;

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
    @JoinColumn({ name: 'teacherId' })
    teacher: Teacher;

    @ManyToOne(() => Subject, (subject) => subject.classrooms)
    @JoinColumn({ name: 'subjectId' })
    subject: Subject;

    @OneToMany(() => Meeting, (meeting) => meeting.class)
    meetings: Meeting[];

    @OneToMany(() => Enrollment, (enrollment) => enrollment.classroom)
    enrollments: Enrollment[];

    @OneToMany(() => Payment, (payment) => payment.classroom)
    payments: Payment[];
}
