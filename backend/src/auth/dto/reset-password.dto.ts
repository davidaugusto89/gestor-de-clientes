import { IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsString({ message: 'O token deve ser uma string' })
  @MinLength(6, { message: 'O token deve ter pelo menos 6 caracteres' })
  token: string;

  @IsString({ message: 'A nova senha deve ser uma string' })
  @MinLength(6, { message: 'A nova senha deve ter pelo menos 6 caracteres' })
  novaSenha: string;
}
