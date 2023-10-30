import { Module } from '@nestjs/common';
import { ProductsApiModule } from './products-management/product.module';
import { WarehouseApiModule } from './warehouse-management/warehouse.module';
import { DatabaseModule } from '../database/database.module';
import { SharedModule } from '../shared/shared.module';
import { AppConfigModule } from '../config/app-config.module';
import { ApiGraphQLModule } from '../graphql/graphql.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    ProductsApiModule,
    WarehouseApiModule,
    SharedModule,
    ApiGraphQLModule,
  ],
  providers: [],
})
export class AppModule {}
