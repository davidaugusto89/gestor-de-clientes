import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';
import { ClienteEntity } from './entities/cliente.entity';
import { IsCpfCnpjConstraint } from '@/validators/cpf-cnpj.validator';

@Module({
  imports: [TypeOrmModule.forFeature([ClienteEntity])],
  controllers: [ClientesController],
  providers: [ClientesService, IsCpfCnpjConstraint],
  exports: [ClientesService],
})
export class ClientesModule {}
