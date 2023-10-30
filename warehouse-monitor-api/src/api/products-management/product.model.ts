import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { WarehouseProductsModel } from '../warehouse-management/models/warehouseProduct.model';

@Entity({ name: 'products' })
export class ProductsModel {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({
    name: 'size_per_unit',
  })
  sizePerUnit: number;

  @Column({ name: 'is_hazardous' })
  isHazardous: boolean;

  @Column()
  quantity: number;

  @OneToMany(
    () => WarehouseProductsModel,
    (warehouseProducts) => warehouseProducts.product,
  )
  warehouseProducts: WarehouseProductsModel[];

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
