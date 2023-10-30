import { MigrationInterface, QueryRunner } from 'typeorm';

export class introduceWarehouseProductsTable1698584839622
  implements MigrationInterface
{
  name = 'introduceWarehouseProductsTable1698584839622';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "warehouses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "size" integer NOT NULL, "hazardous_products_count" integer NOT NULL DEFAULT '0', "total_product_quantity" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_be9dd3cc2931f11f7440f2eeb19" UNIQUE ("name"), CONSTRAINT "PK_56ae21ee2432b2270b48867e4be" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "warehouse_products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_id" uuid NOT NULL, "warehouse_id" uuid NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "PK_64fcddc30222be61dc0ef1664c5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "size_per_unit" integer NOT NULL, "is_hazardous" boolean NOT NULL, "quantity" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "warehouse_products" ADD CONSTRAINT "FK_5d88e688ec4102a78a32a7aa6e2" FOREIGN KEY ("warehouse_id") REFERENCES "warehouses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "warehouse_products" ADD CONSTRAINT "FK_e8fd5d5eff0a010e2b0ffbabfb0" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "warehouse_products" DROP CONSTRAINT "FK_e8fd5d5eff0a010e2b0ffbabfb0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "warehouse_products" DROP CONSTRAINT "FK_5d88e688ec4102a78a32a7aa6e2"`,
    );
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "warehouse_products"`);
    await queryRunner.query(`DROP TABLE "warehouses"`);
  }
}
