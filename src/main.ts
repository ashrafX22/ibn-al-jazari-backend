import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  
  const config = new DocumentBuilder()

    .setTitle('ibn al-jazari docs')

    .setDescription('The  API description')

    .setVersion('0.1')

    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const PORT = process.env.PORT;
  await app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
  });
}
bootstrap();
