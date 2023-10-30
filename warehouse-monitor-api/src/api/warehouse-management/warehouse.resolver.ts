// src/warehouses/warehouse.resolver.ts

import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { WarehouseService } from './warehouse.service';
import {
  AddProductToWarehouseInput,
  ExportProductFromWarehouseInput,
  WarehouseSchema,
  WarehouseFilter,
} from './graphql/warehouse.schema';

@Resolver(() => WarehouseSchema)
export class WarehouseResolver {
  constructor(private warehouseService: WarehouseService) {}

  @Query(() => [WarehouseSchema])
  warehouses(): Promise<WarehouseSchema[]> {
    return this.warehouseService.getAllWarehouses();
  }

  // right not its just id but i used name getFilteredWarehouses because this can be used to get filtered warehouses with more params
  @Query(() => [WarehouseSchema])
  getFilteredWarehouses(
    @Args('input') input: WarehouseFilter,
  ): Promise<WarehouseSchema[] | WarehouseSchema> {
    return this.warehouseService.getFilteredWarehouses(input.id);
  }

  @Mutation(() => WarehouseSchema)
  addProductToWarehouse(@Args('input') input: AddProductToWarehouseInput) {
    return this.warehouseService.addProductToWarehouse(input);
  }

  @Mutation(() => WarehouseSchema)
  exportProductFromWarehouse(
    @Args('input') input: ExportProductFromWarehouseInput,
  ) {
    return this.warehouseService.exportProductFromWarehouse(input);
  }
}
