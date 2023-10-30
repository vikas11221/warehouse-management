import { join, resolve } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

import { EnvType } from '../shared/enums/env-type';
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  LOG_LEVEL,
  NODE_ENV,
  PORT,
} from '../utils/constants';

const rootPath = resolve(process.cwd());
const defaultEnvFile = join(rootPath, '.env');
const nodeEnvFile = process.env.NODE_ENV
  ? [join(rootPath, `.env.${process.env.NODE_ENV.toLowerCase()}`)]
  : [];

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [...nodeEnvFile, defaultEnvFile],
      validationSchema: Joi.object({
        [NODE_ENV]: Joi.string()
          .valid(
            EnvType.Test,
            EnvType.Development,
            EnvType.Staging,
            EnvType.Production,
          )
          .default(EnvType.Development),
        [PORT]: Joi.number().default(8080),
        [DB_HOST]: Joi.string().required(),
        [DB_PORT]: Joi.number().required(),
        [DB_NAME]: Joi.string().required(),
        [DB_USER]: Joi.string().required(),
        [DB_PASSWORD]: Joi.string().required(),
        [LOG_LEVEL]: Joi.string()
          .valid('log', 'error', 'warn', 'debug', 'verbose')
          .default('log'),
      }),
    }),
  ],
  exports: [ConfigService],
  providers: [ConfigService],
})
export class AppConfigModule {}
