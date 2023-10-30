import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductsModel } from '../../products-management/product.model';
import { WarehousesModel } from './warehouse.model';

@Entity({ name: 'warehouse_products' })
export class WarehouseProductsModel {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @ManyToOne(() => WarehousesModel, (warehouse) => warehouse.warehouseProducts)
  @JoinColumn({ name: 'warehouse_id' })
  warehouse: WarehousesModel;

  @ManyToOne(() => ProductsModel, (product) => product.warehouseProducts)
  @JoinColumn({ name: 'product_id' })
  product: ProductsModel;

  @Column()
  product_id: string;

  @Column()
  warehouse_id: string;

  @Column()
  quantity: number;

  // add import and export date and time
}
