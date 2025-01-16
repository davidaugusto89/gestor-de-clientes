"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const usuario_entity_1 = require("../../usuarios/entities/usuario.entity");
const roles_enum_1 = require("../../usuarios/enums/roles.enum");
exports.default = async (dataSource) => {
    // Obtém o repositório padrão diretamente do DataSource
    const usuarioRepository = dataSource.getRepository(usuario_entity_1.UsuarioEntity);
    const usuarios = [
        {
            nome: 'Admin',
            email: 'admin@example.com',
            senha: await (0, bcrypt_1.hash)('123456', 10),
            role: roles_enum_1.UsuarioRole.ADMIN,
        },
        {
            nome: 'usuario',
            email: 'usuario@example.com',
            senha: await (0, bcrypt_1.hash)('123456', 10),
            role: roles_enum_1.UsuarioRole.USER,
        },
    ];
    for (const usuario of usuarios) {
        const existingUsuario = await usuarioRepository.findOneBy({
            email: usuario.email,
        });
        if (!existingUsuario) {
            const novoUsuario = usuarioRepository.create(usuario);
            await usuarioRepository.save(novoUsuario);
            console.log(`Usuário ${usuario.email} criado.`);
        }
        else {
            console.log(`Usuário ${usuario.email} já existe.`);
        }
    }
};
