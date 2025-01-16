import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty({ example: 'João da Silva', description: 'Nome do usuário' })
  @IsNotEmpty({ message: 'O campo nome é obrigatório.' })
  @MinLength(3, { message: 'O nome deve ter pelo menos 3 caracteres' })
  nome: string;

  @ApiProperty({ example: 'joao@email.com', description: 'Email do usuário' })
  @IsNotEmpty({ message: 'O email é obrigatório' })
  @IsEmail({}, { message: 'O e-mail informado não é válido' })
  email: string;

  @ApiProperty({ example: 'senhaSegura123', description: 'Senha do usuário' })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  senha: string;
}
