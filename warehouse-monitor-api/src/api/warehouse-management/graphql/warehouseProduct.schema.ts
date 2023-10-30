import { Field, ObjectType } from '@nestjs/graphql';
import { ProductSchema } from 'src/api/products-management/graphql/product.schema';

@ObjectType()
export class WarehouseProductSchema {
  @Field()
  quantity: number;

  @Field(() => ProductSchema, { nullable: true })
  product: ProductSchema;
}
