import { ClienteEntity } from '../entities/cliente.entity';
import { CreateClienteDto } from '../dto/create-cliente.dto';
import { UpdateClienteDto } from '../dto/update-cliente.dto';

export const mockCliente: ClienteEntity = {
  id: BigInt(1),
  idUsuario: BigInt(1),
  dataHoraCadastro: new Date(),
  codigo: 'CLI123',
  nome: 'Cliente Teste',
  cpfCnpj: '123.456.789-00',
  cep: 12345678,
  logradouro: 'Avenida Central',
  endereco: 'Bloco 1',
  numero: '100',
  bairro: 'Centro',
  cidade: 'Cidade Teste',
  uf: 'SP',
  complemento: 'Apto 101',
  fone: '(11) 98765-4321',
  limiteCredito: 1000.0,
  validade: new Date('2025-01-01'),
};

export const mockCreateClienteDto: CreateClienteDto = {
  idUsuario: BigInt(1),
  codigo: 'CLI123',
  nome: 'Cliente Teste',
  cpfCnpj: '123.456.789-00',
  cep: 12345678,
  logradouro: 'Avenida Central',
  endereco: 'Bloco 1',
  numero: '100',
  bairro: 'Centro',
  cidade: 'Cidade Teste',
  uf: 'SP',
  complemento: 'Apto 101',
  fone: '(11) 98765-4321',
  limiteCredito: 1000.0,
  validade: new Date('2025-01-01').toDateString(),
};

export const mockUpdateClienteDto: UpdateClienteDto = {
  idUsuario: BigInt(1),
  codigo: 'CLI123',
  nome: 'Cliente Atualizado',
  limiteCredito: 2000.0,
};
