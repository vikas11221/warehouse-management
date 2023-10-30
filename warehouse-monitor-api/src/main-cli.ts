import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { CliModule } from './cli/cli.module';

const logger = new Logger('main-cli');

async function bootstrap() {
  const app = await NestFactory.create(CliModule);

  logger.log('Initializing CLI');
  await app.init();
  logger.log('Initialized. Closing CLI');

  await app.close();
  logger.log('CLI closed');
}
bootstrap().catch((error) => {
  logger.error('Unhandled error during bootstrap', error);
});
