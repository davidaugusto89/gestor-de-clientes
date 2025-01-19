import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsDateString,
  MaxLength,
  MinLength,
  Length,
  Min,
  IsNumberString,
  Max,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsCpfCnpj } from '@/validators/cpf-cnpj.validator';

export class CreateClienteDto {
  @ApiProperty({
    example: 1,
    description: 'ID do usuário relacionado ao cliente',
  })
  @IsNotEmpty({ message: 'O ID do usuário é obrigatório' })
  @IsNumber({}, { message: 'O ID do usuário deve ser um número' })
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
  @IsNotEmpty({ message: 'O nome do cliente é obrigatório' })
  @MinLength(3, {
    message: 'O nome do cliente deve ter pelo menos 3 caracteres',
  })
  @MaxLength(150)
  nome: string;

  @ApiProperty({
    example: '123.456.789-00',
    description: 'CPF ou CNPJ do cliente',
  })
  @IsNotEmpty({ message: 'O CPF ou CNPJ do cliente é obrigatório' })
  @MinLength(14, { message: 'O CPF ou CNPJ do cliente deve ter 14 caracteres' })
  @MaxLength(20)
  @IsCpfCnpj({ message: 'O CPF ou CNPJ informado é inválido' })
  cpfCnpj: string;

  @ApiProperty({ example: '12345678', description: 'CEP do cliente' })
  @IsNotEmpty({ message: 'O CEP do cliente é obrigatório' })
  // @IsNumberString({}, { message: 'O CEP do cliente deve ser um número' })
  // @Length(8, 8, { message: 'O CEP do cliente deve ter 8 dígitos' })
  cep: number;

  @ApiProperty({
    example: 'Rua das Flores',
    description: 'Logradouro do cliente',
  })
  @IsNotEmpty({ message: 'O logradouro do cliente é obrigatório' })
  @MinLength(3, {
    message: 'O logradouro do cliente deve ter pelo menos 3 caracteres',
  })
  @MaxLength(100, {
    message: 'O logradouro do cliente deve ter no máximo 100 caracteres',
  })
  logradouro: string;

  @ApiProperty({
    example: 'Rua das Flores',
    description: 'Logradouro do cliente',
  })
  @IsNotEmpty({ message: 'O complemento do cliente é obrigatório' })
  @MinLength(3, {
    message: 'O complemento do cliente deve ter pelo menos 3 caracteres',
  })
  @MaxLength(120, {
    message: 'O complemento do cliente deve ter no máximo 120 caracteres',
  })
  endereco: string;

  @ApiProperty({ example: '123', description: 'Número do cliente' })
  @IsNotEmpty({ message: 'O número do cliente é obrigatório' })
  @IsNumber({}, { message: 'O número do cliente deve ser um número' })
  @Max(999999999999999, {
    message: 'O número do cliente deve ter no máximo 15 dígitos',
  })
  numero: string;

  @ApiProperty({
    example: 'Centro',
    description: 'Bairro do cliente',
  })
  @IsNotEmpty({ message: 'O bairro do cliente é obrigatório' })
  @MinLength(3, {
    message: 'O bairro do cliente deve ter pelo menos 3 caracteres',
  })
  @MaxLength(50, {
    message: 'O bairro do cliente deve ter no máximo 50 caracteres',
  })
  bairro: string;

  @ApiProperty({
    example: 'São Paulo',
    description: 'Cidade do cliente',
  })
  @IsNotEmpty({ message: 'A cidade do cliente é obrigatória' })
  @MinLength(2, {
    message: 'A cidade do cliente deve ter pelo menos 2 caracteres',
  })
  @MaxLength(60, {
    message: 'A cidade do cliente deve ter no máximo 60 caracteres',
  })
  cidade: string;

  @ApiProperty({
    example: 'SP',
    description: 'UF do cliente',
  })
  @IsNotEmpty({ message: 'A UF do cliente é obrigatória' })
  @Length(2, 2, { message: 'A UF do cliente deve ter 2 caracteres' })
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
  @IsNotEmpty({ message: 'O telefone do cliente é obrigatório' })
  @MinLength(14, {
    message: 'O telefone do cliente deve ter 14 caracteres',
  })
  @MaxLength(15, {
    message: 'O telefone do cliente deve ter no máximo 15 caracteres',
  })
  fone: string;

  @ApiProperty({
    example: 1000,
    description: 'Limite de crédito do cliente',
  })
  @IsNotEmpty({ message: 'O limite de crédito do cliente é obrigatório' })
  @IsNumber(
    {},
    { message: 'O limite de crédito do cliente deve ser um número' },
  )
  @Min(0, { message: 'O limite de crédito do cliente deve ser maior que zero' })
  limiteCredito: number;

  @ApiProperty({
    example: '2023-12-31',
    description: 'Data de validade do cliente',
  })
  @IsNotEmpty({ message: 'A data de validade do cliente é obrigatória' })
  @IsDateString(
    {},
    {
      message: 'A data de validade do cliente deve ser uma data válida',
    },
  )
  validade: string;
}
