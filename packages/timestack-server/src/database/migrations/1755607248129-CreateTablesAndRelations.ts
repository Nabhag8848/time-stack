import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTablesAndRelations1755607248129 implements MigrationInterface {
    name = 'CreateTablesAndRelations1755607248129'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "core"."task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "is_billable" boolean NOT NULL, "workspace_id" uuid, "project_id" uuid, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "core"."project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "hourly_rate" double precision, "workspace_id" uuid, "client_id" uuid, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "core"."client" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "currency" character varying(10) NOT NULL, "notes" character varying(255) NOT NULL, "payment_method" character varying(255) NOT NULL, "emails" character varying(320) array NOT NULL, "preference_channel" character varying(255) NOT NULL, "workspace_id" uuid, CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "core"."tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(20) NOT NULL, "workspace_id" uuid, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "core"."user" ADD "workspace_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."user" ADD CONSTRAINT "UQ_baa0fec25dab9d73a98f607458d" UNIQUE ("workspace_id")`);
        await queryRunner.query(`ALTER TABLE "core"."task" ADD CONSTRAINT "FK_4a49d67b2dc62b675e3dfb25296" FOREIGN KEY ("workspace_id") REFERENCES "core"."user"("workspace_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."task" ADD CONSTRAINT "FK_1f53e7ffe94530f9e0221224d29" FOREIGN KEY ("project_id") REFERENCES "core"."project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."project" ADD CONSTRAINT "FK_5cb157e3d3ab8abd16251129dba" FOREIGN KEY ("workspace_id") REFERENCES "core"."user"("workspace_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."project" ADD CONSTRAINT "FK_c72d76e480d7334858782543610" FOREIGN KEY ("client_id") REFERENCES "core"."client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."client" ADD CONSTRAINT "FK_7fcb5a3b75f007958e1dee83b22" FOREIGN KEY ("workspace_id") REFERENCES "core"."user"("workspace_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."tag" ADD CONSTRAINT "FK_ff2b336923f1ec14c2d4ef08b7f" FOREIGN KEY ("workspace_id") REFERENCES "core"."user"("workspace_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."tag" DROP CONSTRAINT "FK_ff2b336923f1ec14c2d4ef08b7f"`);
        await queryRunner.query(`ALTER TABLE "core"."client" DROP CONSTRAINT "FK_7fcb5a3b75f007958e1dee83b22"`);
        await queryRunner.query(`ALTER TABLE "core"."project" DROP CONSTRAINT "FK_c72d76e480d7334858782543610"`);
        await queryRunner.query(`ALTER TABLE "core"."project" DROP CONSTRAINT "FK_5cb157e3d3ab8abd16251129dba"`);
        await queryRunner.query(`ALTER TABLE "core"."task" DROP CONSTRAINT "FK_1f53e7ffe94530f9e0221224d29"`);
        await queryRunner.query(`ALTER TABLE "core"."task" DROP CONSTRAINT "FK_4a49d67b2dc62b675e3dfb25296"`);
        await queryRunner.query(`ALTER TABLE "core"."user" DROP CONSTRAINT "UQ_baa0fec25dab9d73a98f607458d"`);
        await queryRunner.query(`ALTER TABLE "core"."user" DROP COLUMN "workspace_id"`);
        await queryRunner.query(`DROP TABLE "core"."tag"`);
        await queryRunner.query(`DROP TABLE "core"."client"`);
        await queryRunner.query(`DROP TABLE "core"."project"`);
        await queryRunner.query(`DROP TABLE "core"."task"`);
    }

}
