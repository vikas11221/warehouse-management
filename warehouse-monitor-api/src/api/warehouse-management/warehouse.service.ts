import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WarehousesModel } from './models/warehouse.model';
import {
  AddProductToWarehouseInput,
  ExportProductFromWarehouseInput,
  WarehouseSchema,
} from './graphql/warehouse.schema';
import { ProductsModel } from '../products-management/product.model';
import { WarehouseProductsModel } from './models/warehouseProduct.model';

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(WarehousesModel)
    private warehouseRepository: Repository<WarehousesModel>,

    @InjectRepository(ProductsModel)
    private productRepository: Repository<ProductsModel>,

    @InjectRepository(WarehouseProductsModel)
    private warehouseProductRepository: Repository<WarehouseProductsModel>,
  ) {}

  getAllWarehouses(): Promise<WarehouseSchema[]> {
    return this.warehouseRepository.find({
      relations: ['warehouseProducts', 'warehouseProducts.product'],
    });
  }

  getFilteredWarehouses(id: string): Promise<WarehouseSchema[]> {
    return this.warehouseRepository.find({
      relations: ['warehouseProducts', 'warehouseProducts.product'],
      where: {
        id,
      },
    });
  }

  async addProductToWarehouse(
    input: AddProductToWarehouseInput,
  ): Promise<WarehouseSchema> {
    const { warehouseId, productId, quantity } = input;

    const warehouse = await this.getWarehouseWithProducts(warehouseId);

    const product = await this.getProduct(productId);

    if (
      (warehouse.hazardousProductsCount > 0 && !product.isHazardous) ||
      (warehouse.hazardousProductsCount === 0 &&
        warehouse.totalProductQuantity > 0 &&
        product.isHazardous)
    ) {
      throw new Error(
        `Cannot add a hazardous product to a non-hazardous warehouse, or vice versa.`,
      );
    }

    // Check if there is enough quantity in the product table to transfer to the warehouse.
    if (product.quantity < quantity) {
      throw new Error(`Insufficient quantity of product ${product.name}.`);
    }

    // Check if there is enough space in the warehouse.
    if (
      product.sizePerUnit * quantity >
      warehouse.size - warehouse.totalProductQuantity
    ) {
      throw new Error(`Insufficient space in warehouse ${warehouse.name}`);
    }

    // Update the product quantity in the product table.
    product.quantity -= quantity;
    await this.productRepository.save(product);

    await this.addToWarehouseHistory(warehouse, product, quantity);

    // So we don't have to iterate all products of warehouse each time we add product
    if (product.isHazardous) warehouse.hazardousProductsCount += quantity;
    warehouse.totalProductQuantity += quantity * product.sizePerUnit;

    return this.warehouseRepository.save(warehouse);
  }

  async exportProductFromWarehouse(
    input: ExportProductFromWarehouseInput,
  ): Promise<WarehousesModel> {
    const { warehouseId, productId, quantity } = input;

    const product = await this.getProduct(productId);

    const warehouse = await this.getWarehouseWithProducts(warehouseId);

    // Check if the product is in the warehouse and if there is enough quantity to export.
    const productsInWarehouse = warehouse.warehouseProducts.filter(
      (wp) => wp.product.id === productId,
    );

    const totalProductQuantityInWarehouse = productsInWarehouse.reduce(
      (previousValue, currentValue) => previousValue + currentValue.quantity,
      0,
    );

    if (
      !productsInWarehouse.length ||
      totalProductQuantityInWarehouse < quantity
    ) {
      throw new Error(
        `Product with ID ${productId} is not available in sufficient quantity in the warehouse.`,
      );
    }

    // Update the product quantity in the product table.
    product.quantity += quantity;
    await this.productRepository.save(product);

    await this.addToWarehouseHistory(warehouse, product, quantity * -1);

    if (product.isHazardous) warehouse.hazardousProductsCount -= quantity;
    warehouse.totalProductQuantity -= quantity * product.sizePerUnit;

    return this.warehouseRepository.save(warehouse);
  }

  addToWarehouseHistory(
    warehouse: WarehousesModel,
    product: ProductsModel,
    quantity: number,
  ) {
    const warehouseProduct = new WarehouseProductsModel();
    Object.assign(warehouseProduct, {
      warehouse,
      product,
      quantity,
      product_id: product.id,
      warehouse_id: warehouse.id,
    });

    warehouse.warehouseProducts.push(warehouseProduct);

    return this.warehouseProductRepository.save(warehouseProduct);
  }

  async getWarehouseWithProducts(warehouseId: string) {
    const warehouse = await this.warehouseRepository.findOne({
      relations: [
        'warehouseProducts',
        'warehouseProducts.product',
        'warehouseProducts.warehouse',
      ],
      where: {
        id: warehouseId,
      },
    });

    if (!warehouse) {
      throw new Error(`Warehouse with ID ${warehouseId} not found.`);
    }

    return warehouse;
  }

  async getProduct(productId) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new Error(`Product with ID ${productId} not found.`);
    }

    return product;
  }
}
