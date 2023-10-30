import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfigModule } from '../config/app-config.module';

@Global()
@Module({
  imports: [AppConfigModule],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class SharedModule {}
