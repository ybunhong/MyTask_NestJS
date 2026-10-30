import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1793142300000 implements MigrationInterface {
    name = 'CreateUsersTable1793142300000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" 
            ("id" SERIAL NOT NULL,
             "username" character varying NOT NULL,
             "password" character varying NOT NULL,
             "email" character varying NOT NULL,
             CONSTRAINT "PK_cace4a159ff946b2e81ebc2c5d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "UQ_user_username" ON "user" ("username")`);
        await queryRunner.query(`CREATE UNIQUE INDEX "UQ_user_email" ON "user" ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "UQ_user_email"`);
        await queryRunner.query(`DROP INDEX "UQ_user_username"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
