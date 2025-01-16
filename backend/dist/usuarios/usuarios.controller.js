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
exports.UsuariosController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const usuarios_service_1 = require("./usuarios.service");
const usuario_entity_1 = require("./entities/usuario.entity");
let UsuariosController = class UsuariosController {
    constructor(usuariosService) {
        this.usuariosService = usuariosService;
    }
    async create(createUsuarioDto) {
        return this.usuariosService.createUsuario(createUsuarioDto);
    }
    async findByEmail(email) {
        const usuario = await this.usuariosService.findByEmail(email);
        if (!usuario) {
            throw new common_1.NotFoundException('Usuário não encontrado.');
        }
        return usuario;
    }
    async findByResetToken(token) {
        const usuario = await this.usuariosService.findByResetToken(token);
        if (!usuario) {
            throw new common_1.NotFoundException('Token inválido ou usuário não encontrado.');
        }
        return usuario;
    }
    async updatePassword(id, newPassword) {
        if (!newPassword) {
            throw new Error('A nova senha é obrigatória.');
        }
        await this.usuariosService.updatePassword(id, newPassword);
    }
};
exports.UsuariosController = UsuariosController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Cria um novo usuário' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Usuário criado com sucesso.',
        type: usuario_entity_1.UsuarioEntity,
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Busca um usuário pelo email' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Usuário encontrado.',
        type: usuario_entity_1.UsuarioEntity,
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Usuário não encontrado.' }),
    (0, common_1.Get)('email/:email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "findByEmail", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Busca um usuário pelo token de redefinição de senha',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Usuário encontrado.',
        type: usuario_entity_1.UsuarioEntity,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Token inválido ou usuário não encontrado.',
    }),
    (0, common_1.Get)('reset-token/:token'),
    __param(0, (0, common_1.Param)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "findByResetToken", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza a senha de um usuário' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Senha atualizada com sucesso.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do usuário', type: String }),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Put)('password/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('senha')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BigInt, String]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "updatePassword", null);
exports.UsuariosController = UsuariosController = __decorate([
    (0, swagger_1.ApiTags)('Usuários'),
    (0, common_1.Controller)('usuarios'),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService])
], UsuariosController);
