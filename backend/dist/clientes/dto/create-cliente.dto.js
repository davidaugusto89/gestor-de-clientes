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
exports.CreateClienteDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateClienteDto {
}
exports.CreateClienteDto = CreateClienteDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'ID do usuário relacionado ao cliente',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", BigInt)
], CreateClienteDto.prototype, "idUsuario", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'C123', description: 'Código único do cliente' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(15),
    __metadata("design:type", String)
], CreateClienteDto.prototype, "codigo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'João da Silva',
        description: 'Nome completo do cliente',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(150),
    __metadata("design:type", String)
], CreateClienteDto.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '123.456.789-00',
        description: 'CPF ou CNPJ do cliente',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateClienteDto.prototype, "cpfCnpj", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12345678', description: 'CEP do cliente' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateClienteDto.prototype, "cep", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Rua das Flores',
        description: 'Logradouro do cliente',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateClienteDto.prototype, "logradouro", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Rua das Flores',
        description: 'Logradouro do cliente',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(120),
    __metadata("design:type", String)
], CreateClienteDto.prototype, "endereco", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123', description: 'Número do cliente' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], CreateClienteDto.prototype, "numero", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Centro',
        description: 'Bairro do cliente',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateClienteDto.prototype, "bairro", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'São Paulo',
        description: 'Cidade do cliente',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(60),
    __metadata("design:type", String)
], CreateClienteDto.prototype, "cidade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'SP',
        description: 'UF do cliente',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(2),
    __metadata("design:type", String)
], CreateClienteDto.prototype, "uf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Apto 101',
        description: 'Complemento do cliente',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(150),
    __metadata("design:type", String)
], CreateClienteDto.prototype, "complemento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '(11) 1234-5678',
        description: 'Telefone do cliente',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(15),
    __metadata("design:type", String)
], CreateClienteDto.prototype, "fone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1000,
        description: 'Limite de crédito do cliente',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateClienteDto.prototype, "limiteCredito", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2023-12-31',
        description: 'Data de validade do cliente',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateClienteDto.prototype, "validade", void 0);
