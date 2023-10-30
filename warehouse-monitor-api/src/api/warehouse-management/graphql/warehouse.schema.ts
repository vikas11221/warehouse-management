import { InputType, Field, ID, ObjectType } from '@nestjs/graphql';
import { WarehouseProductSchema } from './warehouseProduct.schema';

@ObjectType()
export class CreateWarehouse {
  @Field()
  name: string;

  @Field()
  size: number;
}

@InputType()
export class ExportProductFromWarehouseInput {
  @Field(() => ID)
  warehouseId: string;

  @Field(() => ID)
  productId: string;

  @Field()
  quantity: number;
}

@InputType()
export class AddProductToWarehouseInput {
  @Field(() => ID)
  warehouseId: string;

  @Field(() => ID)
  productId: string;

  @Field()
  quantity: number;
}

@ObjectType()
export class WarehouseSchema {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  size: number;

  @Field()
  hazardousProductsCount: number;

  @Field()
  totalProductQuantity: number;

  @Field(() => [WarehouseProductSchema], { nullable: true })
  warehouseProducts: WarehouseProductSchema[];
}

@InputType()
export class WarehouseFilter {
  @Field(() => ID)
  id: string;
}
