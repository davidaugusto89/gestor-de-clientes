import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { UsuarioRole } from '@/enums/roles.enum';

@Entity('usuarios')
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id: bigint;

  @Column({ type: 'varchar', length: 255 })
  nome: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  senha: string;

  @Column({ type: 'enum', enum: UsuarioRole, default: UsuarioRole.USER })
  role: UsuarioRole;

  @Column({ type: 'varchar', nullable: true })
  resetToken: string | null;

  @CreateDateColumn({ type: 'timestamp' })
  DataHoraCadastro: Date;
}
