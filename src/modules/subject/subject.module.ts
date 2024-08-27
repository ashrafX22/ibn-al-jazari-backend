import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from 'src/models/entities/subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subject])],
  exports: [SubjectService],
  controllers: [SubjectController],
  providers: [SubjectService],
})
export class SubjectModule {}
