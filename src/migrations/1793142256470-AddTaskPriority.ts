import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTaskPriority1793142256470 implements MigrationInterface {
    name = 'AddTaskPriority1793142256470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" 
            ADD "priority" character varying NOT NULL DEFAULT 'medium'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "priority"`);
    }

}
