"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const usuario_repository_1 = require("../../usuarios/repositories/usuario.repository");
const roles_enum_1 = require("../../usuarios/enums/roles.enum");
exports.default = async (dataSource) => {
    const usuarioRepository = new usuario_repository_1.UsuarioRepository(dataSource);
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
        const existingUsuario = await usuarioRepository.findByEmail(usuario.email);
        if (!existingUsuario) {
            await usuarioRepository.createUsuario(usuario);
            console.log(`Usuário ${usuario.email} criado.`);
        }
        else {
            console.log(`Usuário ${usuario.email} já existe.`);
        }
    }
};
