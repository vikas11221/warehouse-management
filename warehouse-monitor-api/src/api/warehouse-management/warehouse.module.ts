import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WarehousesModel } from './models/warehouse.model';
import { WarehouseService } from './warehouse.service';
import { WarehouseResolver } from './warehouse.resolver';
import { ProductsModel } from '../products-management/product.model';
import { getConnectionOptions } from 'typeorm';
import { WarehouseProductsModel } from './models/warehouseProduct.model';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true
        }),
    }),
    TypeOrmModule.forFeature([
      WarehousesModel,
      ProductsModel,
      WarehouseProductsModel,
    ]),
  ],
  providers: [ConfigService, WarehouseService, WarehouseResolver],
  exports: [WarehouseService, TypeOrmModule],
})
export class WarehouseApiModule {}
