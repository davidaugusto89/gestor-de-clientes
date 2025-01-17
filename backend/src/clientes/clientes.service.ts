import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; // Importa o tipo correto
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ClienteEntity } from './entities/cliente.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(ClienteEntity)
    private readonly clienteRepository: Repository<ClienteEntity>,
  ) {}

  /**
   * Cria um novo cliente.
   *
   * @param createClienteDto - Os dados do novo cliente.
   * @returns O cliente criado.
   */
  async create(createClienteDto: CreateClienteDto): Promise<ClienteEntity> {
    const cliente = this.clienteRepository.create(createClienteDto);
    return this.clienteRepository.save(cliente);
  }

  /**
   * Procura todos os clientes.
   *
   * @returns Um array com todos os clientes encontrados.
   */
  async findAll(): Promise<ClienteEntity[]> {
    return this.clienteRepository.find();
  }

  /**
   * Procura um cliente pelo seu ID.
   *
   * @param id - ID do cliente a ser procurado.
   * @returns O cliente encontrado.
   * @throws {NotFoundException} Se o cliente n o for encontrado.
   */
  async findOne(id: bigint): Promise<ClienteEntity> {
    const cliente = await this.clienteRepository.findOneBy({ id });
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    return cliente;
  }

  /**
   * Atualiza um cliente.
   *
   * @param id - ID do cliente a ser atualizado.
   * @param updateClienteDto - Os dados a serem atualizados.
   * @returns O cliente atualizado.
   * @throws {NotFoundException} Se o cliente n o for encontrado.
   */
  async update(
    id: bigint,
    updateClienteDto: UpdateClienteDto,
  ): Promise<ClienteEntity> {
    const cliente = await this.findOne(id);
    Object.assign(cliente, updateClienteDto);
    return this.clienteRepository.save(cliente);
  }

  /**
   * Remove um cliente.
   *
   * @param id - ID do cliente a ser removido.
   * @throws {NotFoundException} Se o cliente n o for encontrado.
   */
  async remove(id: bigint): Promise<void> {
    const cliente = await this.findOne(id);
    await this.clienteRepository.remove(cliente);
  }
}
