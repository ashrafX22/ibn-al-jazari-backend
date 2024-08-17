import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TeacherModule } from './teacher/teacher.module';
@Module({
  imports: [UserModule, PrismaModule, AuthModule, TeacherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
