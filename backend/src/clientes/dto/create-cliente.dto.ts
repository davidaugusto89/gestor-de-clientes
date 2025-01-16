import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsDateString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClienteDto {
  @ApiProperty({
    example: 1,
    description: 'ID do usuário relacionado ao cliente',
  })
  @IsNotEmpty()
  @IsNumber()
  idUsuario: bigint;

  @ApiProperty({ example: 'C123', description: 'Código único do cliente' })
  @IsOptional()
  @IsString()
  @MaxLength(15)
  codigo: string;

  @ApiProperty({
    example: 'João da Silva',
    description: 'Nome completo do cliente',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  nome: string;

  @ApiProperty({
    example: '123.456.789-00',
    description: 'CPF ou CNPJ do cliente',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  cpfCnpj: string;

  @ApiProperty({ example: '12345678', description: 'CEP do cliente' })
  @IsNotEmpty()
  @IsNumber()
  cep: number;

  @ApiProperty({
    example: 'Rua das Flores',
    description: 'Logradouro do cliente',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  logradouro: string;

  @ApiProperty({
    example: 'Rua das Flores',
    description: 'Logradouro do cliente',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  endereco: string;

  @ApiProperty({ example: '123', description: 'Número do cliente' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  numero: string;

  @ApiProperty({
    example: 'Centro',
    description: 'Bairro do cliente',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  bairro: string;

  @ApiProperty({
    example: 'São Paulo',
    description: 'Cidade do cliente',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  cidade: string;

  @ApiProperty({
    example: 'SP',
    description: 'UF do cliente',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(2)
  uf: string;

  @ApiProperty({
    example: 'Apto 101',
    description: 'Complemento do cliente',
  })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  complemento: string;

  @ApiProperty({
    example: '(11) 1234-5678',
    description: 'Telefone do cliente',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(15)
  fone: string;

  @ApiProperty({
    example: 1000,
    description: 'Limite de crédito do cliente',
  })
  @IsNotEmpty()
  @IsNumber()
  limiteCredito: number;

  @ApiProperty({
    example: '2023-12-31',
    description: 'Data de validade do cliente',
  })
  @IsNotEmpty()
  @IsDateString()
  validade: string;
}
