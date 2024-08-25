import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as session from 'express-session';
import * as passport from 'passport';
import RedisStore from 'connect-redis';
import { createClient } from 'redis';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  // TODO: set origin
  app.enableCors({
    origin: process.env.ORIGIN,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const config = new DocumentBuilder()

    .setTitle('ibn al-jazari docs')

    .setDescription('The  API description')

    .setVersion('0.1')

    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // sessions
  // redis cloud
  const redisClient = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
    }
  });
  redisClient.connect().catch(console.error);

  app.use(
    session({
      store: new RedisStore({
        client: redisClient
      }),
      secret: process.env.SESSION_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        secure: false,
        httpOnly: true
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
  });
}
bootstrap();
