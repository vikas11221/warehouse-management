import { Logger, Module, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { warehousesSeed } from './seeds/warehouse.seed';
import { WarehouseApiModule } from '../api/warehouse-management/warehouse.module';
import { WarehousesModel } from '../api/warehouse-management/models/warehouse.model';

enum Command {
  DatabaseSeeds = 'seeds',
}
@Module({
  imports: [WarehouseApiModule],
  providers: [],
})
export class CliModule implements OnApplicationBootstrap {
  private readonly logger = new Logger(CliModule.name);

  constructor(
    @InjectRepository(WarehousesModel)
    private warehouseRepository: Repository<WarehousesModel>,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    this.logger.log('Bootstrapping cli module');

    const [, , command] = process.argv;

    switch (command) {
      case Command.DatabaseSeeds: {
        await this.onDatabaseSeed();
        break;
      }
      default:
        this.logger.log('Unknown cli command');
    }
  }

  async onDatabaseSeed() {
    this.logger.log('Addding seeds in Db');

    //add warehouse

    return Promise.all(
      warehousesSeed.map(async (warehouseSeed) => {
        let warehouseEntity: WarehousesModel;

        warehouseEntity = await this.warehouseRepository.findOne({
          where: {
            name: warehouseSeed.name,
          },
        });

        if (!warehouseEntity) {
          warehouseEntity = new WarehousesModel();
          Object.assign(warehouseEntity, warehouseSeed);
          return this.warehouseRepository.save(warehouseEntity);
        }
      }),
    );
  }
}
