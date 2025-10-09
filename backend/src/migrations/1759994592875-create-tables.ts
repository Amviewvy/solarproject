import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1759994592875 implements MigrationInterface {
    name = 'CreateTables1759994592875'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying(100) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'user', "is_active" boolean NOT NULL DEFAULT 'true', "email_verified" boolean NOT NULL DEFAULT 'false', "last_login" TIMESTAMP DEFAULT now(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_tokens" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "expires_at" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sensors" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "type" character varying(50) NOT NULL, "model" character varying(100), "serial_number" character varying(100), "unit" character varying(20), "location" character varying(200), "status" character varying(20) NOT NULL DEFAULT 'active', "installation_date" TIMESTAMP WITH TIME ZONE, "description" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_b8bd5fcfd700e39e96bcd9ba6b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "environment_data" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "temperature" numeric(5,2), "humidity" numeric(5,2), "pyranometer" numeric(5,2), "sensor_id" integer, CONSTRAINT "PK_2d7a1fd57044db8430519ec0d32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "meter_measurement" ("id" SERIAL NOT NULL, "measurement_time" TIMESTAMP WITH TIME ZONE NOT NULL, "volts_avg" numeric(10,5), "current_sum" numeric(10,5), "watt_sum" numeric(10,5), "voltage_1" numeric(10,5), "voltage_2" numeric(10,5), "voltage_3" numeric(10,5), "current_1" numeric(10,7), "current_2" numeric(10,7), "current_3" numeric(10,7), "va_1" numeric(12,5), "va_2" numeric(12,5), "va_3" numeric(12,5), "var_1" numeric(12,5), "var_2" numeric(12,5), "var_3" numeric(12,5), "pf_1" numeric(12,5), "pf_2" numeric(12,5), "pf_3" numeric(12,5), "energy_im" numeric(14,5), "energy_ex" numeric(14,5), "freq" numeric(10,5), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "meter_id" integer, CONSTRAINT "PK_140f7ba6fd971b9291961db6776" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "meters" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "model" character varying(50), "serial_number" character varying(100), "slave_id" integer NOT NULL, "location" character varying(200), "installation_date" TIMESTAMP WITH TIME ZONE, "status" character varying(20) NOT NULL DEFAULT 'active', "description" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_0a71b52dbb545fa36efaf070583" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_610102b60fea1455310ccd299de" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "environment_data" ADD CONSTRAINT "FK_f5fd389bd9bf053b88bb9f21358" FOREIGN KEY ("sensor_id") REFERENCES "sensors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meter_measurement" ADD CONSTRAINT "FK_64a29df150db1a01e9f2303329d" FOREIGN KEY ("meter_id") REFERENCES "meters"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meter_measurement" DROP CONSTRAINT "FK_64a29df150db1a01e9f2303329d"`);
        await queryRunner.query(`ALTER TABLE "environment_data" DROP CONSTRAINT "FK_f5fd389bd9bf053b88bb9f21358"`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_610102b60fea1455310ccd299de"`);
        await queryRunner.query(`DROP TABLE "meters"`);
        await queryRunner.query(`DROP TABLE "meter_measurement"`);
        await queryRunner.query(`DROP TABLE "environment_data"`);
        await queryRunner.query(`DROP TABLE "sensors"`);
        await queryRunner.query(`DROP TABLE "refresh_tokens"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
