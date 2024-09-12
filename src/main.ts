import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as passport from 'passport';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { JwtAuthGuard } from './modules/auth/jwt/jwt.guard';
import { RolesGuard } from './modules/auth/guards/roles.guard';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // cors
  app.enableCors({
    origin: process.env.ORIGIN,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
    exposedHeaders: 'Authorization',
  });

  // globals
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(app.get(JwtAuthGuard), app.get(RolesGuard));

  // passort
  app.use(passport.initialize());

  // helmet
  app.use(
    helmet({
      hidePoweredBy: true,
    }),
  );

  // swagger
  const config = new DocumentBuilder()
    .setTitle('ibn al-jazari docs')
    .setDescription('The  API description')
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
  });
}
bootstrap();
