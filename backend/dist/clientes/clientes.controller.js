"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const clientes_service_1 = require("./clientes.service");
const create_cliente_dto_1 = require("./dto/create-cliente.dto");
const update_cliente_dto_1 = require("./dto/update-cliente.dto");
const cliente_entity_1 = require("./entities/cliente.entity");
let ClientesController = class ClientesController {
    constructor(clientesService) {
        this.clientesService = clientesService;
    }
    create(createClienteDto) {
        return this.clientesService.create(createClienteDto);
    }
    findAll() {
        return this.clientesService.findAll();
    }
    findOne(id) {
        return this.clientesService.findOne(id);
    }
    update(id, updateClienteDto) {
        return this.clientesService.update(id, updateClienteDto);
    }
    remove(id) {
        return this.clientesService.remove(id);
    }
};
exports.ClientesController = ClientesController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Cria um novo cliente' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Cliente criado com sucesso.',
        type: cliente_entity_1.ClienteEntity,
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cliente_dto_1.CreateClienteDto]),
    __metadata("design:returntype", void 0)
], ClientesController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Obtém todos os clientes' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de clientes.',
        type: [cliente_entity_1.ClienteEntity],
    }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClientesController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Obtém um cliente pelo ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Cliente encontrado.',
        type: cliente_entity_1.ClienteEntity,
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do cliente', type: Number }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt]),
    __metadata("design:returntype", void 0)
], ClientesController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza um cliente pelo ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Cliente atualizado com sucesso.',
        type: cliente_entity_1.ClienteEntity,
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do cliente', type: Number }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, update_cliente_dto_1.UpdateClienteDto]),
    __metadata("design:returntype", void 0)
], ClientesController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Remove um cliente pelo ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cliente removido com sucesso.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do cliente', type: Number }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt]),
    __metadata("design:returntype", void 0)
], ClientesController.prototype, "remove", null);
exports.ClientesController = ClientesController = __decorate([
    (0, swagger_1.ApiTags)('Clientes') // Define a tag do grupo no Swagger
    ,
    (0, common_1.Controller)('clientes'),
    __metadata("design:paramtypes", [clientes_service_1.ClientesService])
], ClientesController);
