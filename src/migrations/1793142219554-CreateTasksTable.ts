import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTasksTable1793142219554 implements MigrationInterface {
    name = 'CreateTasksTable1793142219554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task" 
            ("id" SERIAL NOT NULL,
             "title" character varying NOT NULL,
             "done" boolean NOT NULL,
             CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "task"`);
    }

}
