import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    example: 'novaSenha123',
    description: 'Nova senha do usuário',
  })
  @IsNotEmpty()
  @MinLength(6)
  senha: string;
}
