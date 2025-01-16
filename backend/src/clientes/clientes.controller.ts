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

@ApiTags('Clientes') // Define a tag do grupo no Swagger
@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

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

  @ApiOperation({ summary: 'Remove um cliente pelo ID' })
  @ApiResponse({ status: 200, description: 'Cliente removido com sucesso.' })
  @ApiParam({ name: 'id', description: 'ID do cliente', type: Number })
  @Delete(':id')
  remove(@Param('id') id: bigint) {
    return this.clientesService.remove(id);
  }
}
