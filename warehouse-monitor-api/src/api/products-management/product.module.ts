import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsModel } from './product.model';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { WarehouseProductsModel } from '../warehouse-management/models/warehouseProduct.model';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsModel, WarehouseProductsModel])],
  providers: [ConfigService, ProductService, ProductResolver],
  exports: [ProductService, TypeOrmModule],
})
export class ProductsApiModule {}
