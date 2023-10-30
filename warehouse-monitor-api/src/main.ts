import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import 'dotenv/config';

async function bootstrap() {
  const logger = new Logger('Main');

  const serverPort = 3001;
  const app = await NestFactory.create(AppModule);

  // // Setup APP
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(
    helmet({
      contentSecurityPolicy: false, // for production should be true https://studio.apollographql.com can be used instead
    }),
  );
  app.enableCors({
    origin: ['https://studio.apollographql.com', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
  });

  await app.listen(serverPort);

  logger.log(`API running at http://localhost:${serverPort}`);
}
bootstrap();
