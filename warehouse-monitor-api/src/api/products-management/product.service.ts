// src/products/product.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateProductInput,
  UpdateProductInput,
  ProductSchema,
} from './graphql/product.schema';
import { ProductsModel } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductsModel)
    private productRepository: Repository<ProductsModel>,
  ) {}

  findAllProducts(): Promise<ProductSchema[]> {
    return this.productRepository.find();
  }

  createProduct(input: CreateProductInput): Promise<ProductSchema> {
    const product = this.productRepository.create(input);
    return this.productRepository.save(product);
  }

  async updateProduct(input: UpdateProductInput): Promise<ProductSchema> {
    const product = await this.productRepository.findOne({
      where: { id: input.id },
    });
    if (!product) {
      throw new Error(`Product with ID ${input.id} not found.`);
    }

    Object.assign(product, input);
    return this.productRepository.save(product);
  }
}
