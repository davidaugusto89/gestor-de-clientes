import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('clientes')
export class ClienteEntity {
  @PrimaryGeneratedColumn('increment')
  id: bigint;

  @Column({ type: 'bigint' })
  idUsuario: bigint;

  @CreateDateColumn()
  dataHoraCadastro: Date;

  @Column({ type: 'varchar', length: 15 })
  codigo: string;

  @Column({ type: 'varchar', length: 150 })
  nome: string;

  @Column({ type: 'varchar', length: 20 })
  cpfCnpj: string;

  @Column({ type: 'int' })
  cep: number;

  @Column({ type: 'varchar', length: 100 })
  logradouro: string;

  @Column({ type: 'varchar', length: 120 })
  endereco: string;

  @Column({ type: 'varchar', length: 20 })
  numero: string;

  @Column({ type: 'varchar', length: 50 })
  bairro: string;

  @Column({ type: 'varchar', length: 60 })
  cidade: string;

  @Column({ type: 'varchar', length: 2 })
  uf: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  complemento: string;

  @Column({ type: 'varchar', length: 15 })
  fone: string;

  @Column({ type: 'float' })
  limiteCredito: number;

  @Column({ type: 'date' })
  validade: Date;
}
