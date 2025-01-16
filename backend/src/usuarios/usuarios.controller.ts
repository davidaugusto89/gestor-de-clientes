import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UsuariosService } from './usuarios.service';
import { UsuarioEntity } from './entities/usuario.entity';

@ApiTags('Usuários')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso.',
    type: UsuarioEntity,
  })
  @Post()
  async create(
    @Body() createUsuarioDto: Partial<UsuarioEntity>,
  ): Promise<UsuarioEntity> {
    return this.usuariosService.createUsuario(createUsuarioDto);
  }

  @ApiOperation({ summary: 'Busca um usuário pelo email' })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado.',
    type: UsuarioEntity,
  })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @Get('email/:email')
  async findByEmail(@Param('email') email: string): Promise<UsuarioEntity> {
    const usuario = await this.usuariosService.findByEmail(email);
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado.');
    }
    return usuario;
  }

  @ApiOperation({
    summary: 'Busca um usuário pelo token de redefinição de senha',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado.',
    type: UsuarioEntity,
  })
  @ApiResponse({
    status: 404,
    description: 'Token inválido ou usuário não encontrado.',
  })
  @Get('reset-token/:token')
  async findByResetToken(
    @Param('token') token: string,
  ): Promise<UsuarioEntity> {
    const usuario = await this.usuariosService.findByResetToken(token);
    if (!usuario) {
      throw new NotFoundException('Token inválido ou usuário não encontrado.');
    }
    return usuario;
  }

  @ApiOperation({ summary: 'Atualiza a senha de um usuário' })
  @ApiResponse({ status: 200, description: 'Senha atualizada com sucesso.' })
  @ApiParam({ name: 'id', description: 'ID do usuário', type: String })
  @HttpCode(HttpStatus.OK)
  @Put('password/:id')
  async updatePassword(
    @Param('id') id: bigint,
    @Body('senha') newPassword: string,
  ): Promise<void> {
    if (!newPassword) {
      throw new Error('A nova senha é obrigatória.');
    }
    await this.usuariosService.updatePassword(id, newPassword);
  }
}
