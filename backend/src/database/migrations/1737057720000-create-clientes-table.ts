import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateClientesTable1737029880495 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'clientes',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'idUsuario', type: 'bigint', isNullable: false },
          {
            name: 'dataHoraCadastro',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          { name: 'codigo', type: 'varchar', length: '15' },
          { name: 'nome', type: 'varchar', length: '150' },
          { name: 'cpfCnpj', type: 'varchar', length: '20' },
          { name: 'cep', type: 'varchar', length: '9' },
          { name: 'logradouro', type: 'varchar', length: '100' },
          { name: 'endereco', type: 'varchar', length: '120' },
          { name: 'numero', type: 'varchar', length: '20' },
          { name: 'bairro', type: 'varchar', length: '50' },
          { name: 'cidade', type: 'varchar', length: '60' },
          { name: 'uf', type: 'varchar', length: '2' },
          {
            name: 'complemento',
            type: 'varchar',
            length: '150',
            isNullable: true,
          },
          { name: 'fone', type: 'varchar', length: '16' },
          { name: 'limiteCredito', type: 'float' },
          { name: 'validade', type: 'date' },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'clientes',
      new TableForeignKey({
        columnNames: ['idUsuario'],
        referencedColumnNames: ['id'],
        referencedTableName: 'usuarios',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('clientes', 'idUsuario');
    await queryRunner.dropTable('clientes');
  }
}
