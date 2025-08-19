import { MigrationInterface, QueryRunner } from "typeorm";

export class ProjectAndTagRelation1755608546371 implements MigrationInterface {
    name = 'ProjectAndTagRelation1755608546371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "core"."project_tag" ("project_id" uuid NOT NULL, "tag_id" uuid NOT NULL, CONSTRAINT "PK_381718fbcf0873266aea00963d8" PRIMARY KEY ("project_id", "tag_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a877252b62b3365e3ab33771ca" ON "core"."project_tag" ("project_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_37d6a2871e3810dbb4556e24cc" ON "core"."project_tag" ("tag_id") `);
        await queryRunner.query(`ALTER TABLE "core"."tag" ADD "color" character varying(30) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "core"."task" DROP CONSTRAINT "FK_4a49d67b2dc62b675e3dfb25296"`);
        await queryRunner.query(`ALTER TABLE "core"."project" DROP CONSTRAINT "FK_5cb157e3d3ab8abd16251129dba"`);
        await queryRunner.query(`ALTER TABLE "core"."client" DROP CONSTRAINT "FK_7fcb5a3b75f007958e1dee83b22"`);
        await queryRunner.query(`ALTER TABLE "core"."tag" DROP CONSTRAINT "FK_ff2b336923f1ec14c2d4ef08b7f"`);
        await queryRunner.query(`CREATE SEQUENCE IF NOT EXISTS "core"."user_workspace_id_seq" OWNED BY "core"."user"."workspace_id"`);
        await queryRunner.query(`ALTER TABLE "core"."user" ALTER COLUMN "workspace_id" SET DEFAULT nextval('"core"."user_workspace_id_seq"')`);
        await queryRunner.query(`ALTER TABLE "core"."task" ADD CONSTRAINT "FK_4a49d67b2dc62b675e3dfb25296" FOREIGN KEY ("workspace_id") REFERENCES "core"."user"("workspace_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."tag" ADD CONSTRAINT "FK_ff2b336923f1ec14c2d4ef08b7f" FOREIGN KEY ("workspace_id") REFERENCES "core"."user"("workspace_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."project" ADD CONSTRAINT "FK_5cb157e3d3ab8abd16251129dba" FOREIGN KEY ("workspace_id") REFERENCES "core"."user"("workspace_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."client" ADD CONSTRAINT "FK_7fcb5a3b75f007958e1dee83b22" FOREIGN KEY ("workspace_id") REFERENCES "core"."user"("workspace_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."project_tag" ADD CONSTRAINT "FK_a877252b62b3365e3ab33771cab" FOREIGN KEY ("project_id") REFERENCES "core"."project"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "core"."project_tag" ADD CONSTRAINT "FK_37d6a2871e3810dbb4556e24cc0" FOREIGN KEY ("tag_id") REFERENCES "core"."tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."project_tag" DROP CONSTRAINT "FK_37d6a2871e3810dbb4556e24cc0"`);
        await queryRunner.query(`ALTER TABLE "core"."project_tag" DROP CONSTRAINT "FK_a877252b62b3365e3ab33771cab"`);
        await queryRunner.query(`ALTER TABLE "core"."client" DROP CONSTRAINT "FK_7fcb5a3b75f007958e1dee83b22"`);
        await queryRunner.query(`ALTER TABLE "core"."project" DROP CONSTRAINT "FK_5cb157e3d3ab8abd16251129dba"`);
        await queryRunner.query(`ALTER TABLE "core"."tag" DROP CONSTRAINT "FK_ff2b336923f1ec14c2d4ef08b7f"`);
        await queryRunner.query(`ALTER TABLE "core"."task" DROP CONSTRAINT "FK_4a49d67b2dc62b675e3dfb25296"`);
        await queryRunner.query(`ALTER TABLE "core"."user" ALTER COLUMN "workspace_id" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "core"."user_workspace_id_seq"`);
        await queryRunner.query(`ALTER TABLE "core"."tag" ADD CONSTRAINT "FK_ff2b336923f1ec14c2d4ef08b7f" FOREIGN KEY ("workspace_id") REFERENCES "core"."user"("workspace_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."client" ADD CONSTRAINT "FK_7fcb5a3b75f007958e1dee83b22" FOREIGN KEY ("workspace_id") REFERENCES "core"."user"("workspace_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."project" ADD CONSTRAINT "FK_5cb157e3d3ab8abd16251129dba" FOREIGN KEY ("workspace_id") REFERENCES "core"."user"("workspace_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."task" ADD CONSTRAINT "FK_4a49d67b2dc62b675e3dfb25296" FOREIGN KEY ("workspace_id") REFERENCES "core"."user"("workspace_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."tag" DROP COLUMN "color"`);
        await queryRunner.query(`DROP INDEX "core"."IDX_37d6a2871e3810dbb4556e24cc"`);
        await queryRunner.query(`DROP INDEX "core"."IDX_a877252b62b3365e3ab33771ca"`);
        await queryRunner.query(`DROP TABLE "core"."project_tag"`);
    }

}
