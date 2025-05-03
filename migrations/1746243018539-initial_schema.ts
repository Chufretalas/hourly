import { MigrationInterface, QueryRunner } from "typeorm";
import * as fs from 'fs';
import * as path from 'path';

export class InitialSchema1746243018539 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            const sqlFilePath = path.join(__dirname, '..', '..', 'SQL', '1746243018539-initial_schema_up.sql');
            const sql = fs.readFileSync(sqlFilePath, 'utf8');
            const statements = sql.split(';');

            await queryRunner.startTransaction();
            for (const statement of statements) {
                if (statement.trim()) {
                    await queryRunner.query(statement);
                }
            }
            await queryRunner.commitTransaction();
            console.log('Initial schema migration executed successfully!');
        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.error('Error executing initial schema migration:', error);
            throw error;
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        try {
            const downSqlFilePath = path.join(__dirname, '..', '..', 'SQL', '1746243018539-initial_schema_down.sql');
            const downSql = fs.readFileSync(downSqlFilePath, 'utf8');
            const downStatements = downSql.split(';');

            await queryRunner.startTransaction();
            for (const statement of downStatements) {
                if (statement.trim()) {
                    await queryRunner.query(statement);
                }
            }
            await queryRunner.commitTransaction();
            console.log('Initial schema migration reverted successfully!');
        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.error('Error reverting initial schema migration:', error);
            throw error;
        }
    }
}