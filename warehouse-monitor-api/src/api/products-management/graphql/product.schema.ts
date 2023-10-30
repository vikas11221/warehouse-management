import { InputType, Field, ID, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field()
  sizePerUnit: number;

  @Field()
  isHazardous: boolean;

  @Field()
  quantity: number;
}

@InputType()
export class UpdateProductInput {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  quantity?: number;
}

@ObjectType()
export class ProductSchema {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  sizePerUnit: number;

  @Field()
  isHazardous: boolean;

  @Field()
  quantity: number;
}
