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

  async create(createClienteDto: CreateClienteDto): Promise<ClienteEntity> {
    const cliente = this.clienteRepository.create(createClienteDto);
    return this.clienteRepository.save(cliente);
  }

  async findAll(): Promise<ClienteEntity[]> {
    return this.clienteRepository.find();
  }

  async findOne(id: bigint): Promise<ClienteEntity> {
    const cliente = await this.clienteRepository.findOneBy({ id });
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    return cliente;
  }

  async update(
    id: bigint,
    updateClienteDto: UpdateClienteDto,
  ): Promise<ClienteEntity> {
    const cliente = await this.findOne(id);
    Object.assign(cliente, updateClienteDto);
    return this.clienteRepository.save(cliente);
  }

  async remove(id: bigint): Promise<void> {
    const cliente = await this.findOne(id);
    await this.clienteRepository.remove(cliente);
  }
}
