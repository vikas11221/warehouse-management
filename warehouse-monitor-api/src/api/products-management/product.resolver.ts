// src/products/product.resolver.ts

import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductService } from './product.service';
import {
  CreateProductInput,
  ProductSchema,
  UpdateProductInput,
} from './graphql/product.schema';

@Resolver(() => ProductSchema)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(() => [ProductSchema])
  products() {
    return this.productService.findAllProducts();
  }

  @Mutation(() => ProductSchema)
  createProduct(@Args('input') input: CreateProductInput) {
    return this.productService.createProduct(input);
  }

  @Mutation(() => ProductSchema)
  updateProduct(@Args('input') input: UpdateProductInput) {
    return this.productService.updateProduct(input);
  }
}
