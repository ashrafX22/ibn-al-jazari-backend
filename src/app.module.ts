import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { GoogleMeetModule } from './modules/google-meet/google-meet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/models/entities/student.entity';
import { Teacher } from 'src/models/entities/teacher.entity';
import { Classroom } from 'src/models/entities/classroom.entity';
import { Enrollment } from 'src/models/entities/enrollment.entity';
import { Subject } from 'src/models/entities/subject.entity';
import { Meeting } from 'src/models/entities/meeting.entity';
import { Payment } from 'src/models/entities/payment.entity';
import { TeachersPayment } from 'src/models/entities/teacher-payment.entity';
import { TeacherModule } from './modules/teacher/teacher.module';
import { StudentModule } from './modules/student/student.module';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule
import { UserModule } from './modules/user/user.module';
import { SubjectModule } from './modules/subject/subject.module';
import { ClassroomModule } from './modules/classroom/classroom.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [
        Student,
        Teacher,
        Classroom,
        Enrollment,
        Subject,
        Meeting,
        Payment,
        TeachersPayment,
      ],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      migrationsRun: true,
      synchronize: true, // Set to false in production
      logging: true,
    }),
    TypeOrmModule.forFeature([
      Student,
      Teacher,
      Classroom,
      Enrollment,
      Subject,
      Meeting,
      Payment,
      TeachersPayment,
    ]),
    UserModule,
    TeacherModule,
    StudentModule,
    SubjectModule,
    ClassroomModule,
    AuthModule,
    GoogleMeetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
