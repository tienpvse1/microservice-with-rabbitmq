import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeRandomField1679909983849 implements MigrationInterface {
  name = 'removeRandomField1679909983849';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "random"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "random" character varying NOT NULL`,
    );
  }
}
