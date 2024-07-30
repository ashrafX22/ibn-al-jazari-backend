import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShiekhModule } from './shiekh/shiekh.module';

@Module({
  imports: [ShiekhModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
