import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UsuarioRole } from '@/enums/roles.enum';

@Entity('usuarios')
export class UsuarioEntity {
  @ApiProperty({
    description: 'ID único do usuário',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: bigint;

  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João Silva',
  })
  @Column({ type: 'varchar', length: 255 })
  nome: string;

  @ApiProperty({
    description: 'E-mail do usuário, que deve ser único',
    example: 'joao.silva@example.com',
  })
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário (armazenada como hash)',
    example: 'hashed_password',
  })
  @Column({ type: 'varchar', length: 255 })
  senha: string;

  @ApiProperty({
    description: 'Role do usuário, define permissões',
    example: UsuarioRole.USER,
    enum: UsuarioRole,
  })
  @Column({ type: 'enum', enum: UsuarioRole, default: UsuarioRole.USER })
  role: UsuarioRole;

  @ApiProperty({
    description: 'Token de redefinição de senha (opcional)',
    example: 'random-reset-token',
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  resetToken: string | null;

  @ApiProperty({
    description: 'Data e hora de expiração do token de redefinição (opcional)',
    example: '2025-01-19T12:00:00Z',
    nullable: true,
  })
  @Column({ type: 'timestamp', nullable: true })
  resetTokenExpiration: Date | null;

  @ApiProperty({
    description: 'Data e hora de cadastro do usuário',
    example: '2025-01-19T10:00:00Z',
  })
  @CreateDateColumn({ type: 'timestamp' })
  DataHoraCadastro: Date;
}
