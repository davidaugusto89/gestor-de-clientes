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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const usuario_entity_1 = require("../entities/usuario.entity");
let UsuarioRepository = class UsuarioRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.repository = this.dataSource.getRepository(usuario_entity_1.UsuarioEntity);
    }
    async findByEmail(email) {
        return this.repository.findOneBy({ email });
    }
    async createUsuario(data) {
        const user = this.repository.create(data);
        return this.repository.save(user);
    }
    async updatePassword(userId, hashedPassword) {
        await this.repository.update(userId, { senha: hashedPassword });
    }
};
exports.UsuarioRepository = UsuarioRepository;
exports.UsuarioRepository = UsuarioRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], UsuarioRepository);
