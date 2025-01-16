"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsuariosTable1737029880495 = void 0;
const typeorm_1 = require("typeorm");
class CreateUsuariosTable1737029880495 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'usuarios',
            columns: [
                {
                    name: 'id',
                    type: 'bigint',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'nome',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '255',
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: 'senha',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'role',
                    type: 'enum',
                    enum: ['USER', 'ADMIN'],
                    default: "'USER'",
                },
                {
                    name: 'resetToken',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'DataHoraCadastro',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('users');
    }
}
exports.CreateUsuariosTable1737029880495 = CreateUsuariosTable1737029880495;
