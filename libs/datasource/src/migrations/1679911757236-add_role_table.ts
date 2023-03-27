import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRoleTable1679911757236 implements MigrationInterface {
  name = 'addRoleTable1679911757236';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."role_name_enum" AS ENUM('user', 'administrator')`,
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" "public"."role_name_enum" NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`INSERT INTO "role" (name) VALUES ('user')`);
    await queryRunner.query(
      `INSERT INTO "role" (name) VALUES ('administrator')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TYPE "public"."role_name_enum"`);
  }
}
