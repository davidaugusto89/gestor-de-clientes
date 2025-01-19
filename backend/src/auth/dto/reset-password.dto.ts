import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    example: '123456',
    description: 'Token de redefinição de senha',
  })
  @IsString({ message: 'O token deve ser uma string' })
  @MinLength(6, { message: 'O token deve ter pelo menos 6 caracteres' })
  token: string;

  @ApiProperty({ example: '123456', description: 'Nova senha do usuário' })
  @IsString({ message: 'A nova senha deve ser uma string' })
  @MinLength(6, { message: 'A nova senha deve ter pelo menos 6 caracteres' })
  novaSenha: string;
}
