import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { StudentModule } from './student/student.module';
import { AuthModule } from './auth/auth.module';
import { TeacherModule } from './teacher/teacher.module';
@Module({
  imports: [StudentModule, PrismaModule, AuthModule, TeacherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
