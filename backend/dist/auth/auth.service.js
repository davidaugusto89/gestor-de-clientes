"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const usuarios_service_1 = require("../usuarios/usuarios.service");
let AuthService = class AuthService {
    constructor(usuarioService, jwtService) {
        this.usuarioService = usuarioService;
        this.jwtService = jwtService;
    }
    async login(loginDto) {
        const user = await this.usuarioService.findByEmail(loginDto.email);
        if (!user || !(await bcrypt.compare(loginDto.senha, user.senha))) {
            throw new common_1.UnauthorizedException('Credenciais inválidas');
        }
        const payload = {
            sub: user.id,
            email: user.email,
            nome: user.nome,
            role: user.role,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async register(registerDto) {
        const hashedPassword = await bcrypt.hash(registerDto.senha, 10);
        return this.usuarioService.createUsuario({
            ...registerDto,
            senha: hashedPassword,
        });
    }
    async forgotPassword(forgotPasswordDto) {
        const user = await this.usuarioService.findByEmail(forgotPasswordDto.email);
        if (!user) {
            throw new common_1.UnauthorizedException('Usuário não encontrado');
        }
        // Aqui você pode enviar um email com um token para redefinir a senha
        return { message: 'Instruções enviadas para o email' };
    }
    async resetPassword(resetPasswordDto) {
        const user = await this.usuarioService.findByResetToken(resetPasswordDto.token);
        if (!user) {
            throw new common_1.UnauthorizedException('Token inválido');
        }
        const hashedPassword = await bcrypt.hash(resetPasswordDto.novaSenha, 10);
        await this.usuarioService.updatePassword(user.id, hashedPassword);
        return { message: 'Senha alterada com sucesso' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService,
        jwt_1.JwtService])
], AuthService);
