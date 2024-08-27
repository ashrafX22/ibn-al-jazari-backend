import { Module } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { ClassroomController } from './classroom.controller';
import { Classroom } from 'src/models/entities/classroom.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Classroom])],
  exports: [ClassroomService],
  controllers: [ClassroomController],
  providers: [ClassroomService],
})
export class ClassroomModule {}