import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ClienteEntity } from './entities/cliente.entity';

@ApiTags('Clientes')
@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  /**
   * Cria um novo cliente.
   *
   * @param createClienteDto - Os dados do novo cliente.
   * @returns O cliente criado.
   */
  @ApiOperation({ summary: 'Cria um novo cliente' })
  @ApiResponse({
    status: 201,
    description: 'Cliente criado com sucesso.',
    type: ClienteEntity,
  })
  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clientesService.create(createClienteDto);
  }

  /**
   * Obtém todos os clientes.
   *
   * @returns Um array contendo todos os clientes encontrados.
   */
  @ApiOperation({ summary: 'Obtém todos os clientes' })
  @ApiResponse({
    status: 200,
    description: 'Lista de clientes.',
    type: [ClienteEntity],
  })
  @Get()
  findAll() {
    return this.clientesService.findAll();
  }

  /**
   * Obtém um cliente pelo seu ID.
   *
   * @param id - ID do cliente.
   * @returns O cliente encontrado.
   * @throws {NotFoundException} Se o cliente n o for encontrado.
   */
  @ApiOperation({ summary: 'Obtém um cliente pelo ID' })
  @ApiResponse({
    status: 200,

    description: 'Cliente encontrado.',
    type: ClienteEntity,
  })
  @ApiParam({ name: 'id', description: 'ID do cliente', type: Number })
  @Get(':id')
  findOne(@Param('id') id: bigint) {
    return this.clientesService.findOne(id);
  }

  /**
   * Atualiza um cliente pelo seu ID.
   *
   * @param id - ID do cliente.
   * @param updateClienteDto - Os dados a serem atualizados.
   * @returns O cliente atualizado.
   * @throws {NotFoundException} Se o cliente n o for encontrado.
   */
  @ApiOperation({ summary: 'Atualiza um cliente pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Cliente atualizado com sucesso.',
    type: ClienteEntity,
  })
  @ApiParam({ name: 'id', description: 'ID do cliente', type: Number })
  @Put(':id')
  update(@Param('id') id: bigint, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clientesService.update(id, updateClienteDto);
  }

  /**
   * Remove um cliente pelo seu ID.
   *
   * @param id - ID do cliente.
   * @throws {NotFoundException} Se o cliente n o for encontrado.
   */
  @ApiOperation({ summary: 'Remove um cliente pelo ID' })
  @ApiResponse({ status: 200, description: 'Cliente removido com sucesso.' })
  @ApiParam({ name: 'id', description: 'ID do cliente', type: Number })
  @Delete(':id')
  remove(@Param('id') id: bigint) {
    return this.clientesService.remove(id);
  }
}
