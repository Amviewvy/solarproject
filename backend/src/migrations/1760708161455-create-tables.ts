import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1760708161455 implements MigrationInterface {
    name = 'CreateTables1760708161455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meter_measurement" DROP CONSTRAINT "FK_64a29df150db1a01e9f2303329d"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "is_active" SET DEFAULT 'true'`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "email_verified" SET DEFAULT 'false'`);
        await queryRunner.query(`ALTER TABLE "meter_measurement" ADD CONSTRAINT "FK_64a29df150db1a01e9f2303329d" FOREIGN KEY ("meter_id") REFERENCES "meters"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meter_measurement" DROP CONSTRAINT "FK_64a29df150db1a01e9f2303329d"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "email_verified" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "is_active" SET DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "meter_measurement" ADD CONSTRAINT "FK_64a29df150db1a01e9f2303329d" FOREIGN KEY ("meter_id") REFERENCES "meters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
