import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty({ example: 'João da Silva', description: 'Nome do usuário' })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({ example: 'joao@email.com', description: 'Email do usuário' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'senhaSegura123', description: 'Senha do usuário' })
  @IsNotEmpty()
  @MinLength(6)
  senha: string;
}
