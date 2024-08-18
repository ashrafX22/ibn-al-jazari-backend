import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
// import { AuthModule } from './auth/auth.module';
// import { GoogleMeetModule } from './google-meet/google-meet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/entities/user.entity';
import { Student } from 'src/models/entities/student.entity';
import { Teacher } from 'src/models/entities/teacher.entity';
import { Classroom } from 'src/models/entities/classroom.entity';
import { Enrollment } from 'src/models/entities/enrollment.entity';
import { Subject } from 'src/models/entities/subject.entity';
import { Meeting } from 'src/models/entities/meeting.entity';
import { Payment } from 'src/models/entities/payment.entity';
import { TeachersPayment } from 'src/models/entities/teacher-payment.entity';
import { TeacherModule } from './teacher/teacher.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost' || process.env.DB_HOST,
      port: 5432 || +process.env.DB_PORT,
      username: 'postgres' || process.env.DB_USER,
      password: process.env.DB_PASSWORD || 'password',
      database: 'ibn-al-jazari-db' || process.env.DB_NAME,
      entities: [
        User,
        Student,
        Teacher,
        Classroom,
        Enrollment,
        Subject,
        Meeting,
        Payment,
        TeachersPayment,
      ], // 'models/entities/*.entity{.ts,.js}'
      // migrations: ['migrations/*{.ts,.js}'],
      synchronize: true, // Set to false in production
      logging: true,
    }),
    TypeOrmModule.forFeature([
      User,
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
    // AuthModule,
    // GoogleMeetModule,
    TeacherModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
