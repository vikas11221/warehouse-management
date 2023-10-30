import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        autoSchemaFile: join(process.cwd(), './src/graphql/schema.gql'),
        debug: true, // can be disabled in production left it for your ref
        playground: true, // can be disabled in production left it for your ref
      }),
    }),
  ],
})
export class ApiGraphQLModule {}
