import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WarehouseProductsModel } from './warehouseProduct.model';

@Entity({ name: 'warehouses' })
export class WarehousesModel {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  size: number;

  @Column({ name: 'hazardous_products_count', default: 0 })
  hazardousProductsCount: number;

  @Column({ name: 'total_product_quantity', default: 0 })
  totalProductQuantity: number;

  @OneToMany(
    () => WarehouseProductsModel,
    (warehouseProduct) => warehouseProduct.warehouse,
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
