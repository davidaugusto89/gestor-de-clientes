import { DataSource } from 'typeorm';
import { hash } from 'bcrypt';
import { UsuarioEntity } from '@/usuarios/entities/usuario.entity';
import { UsuarioRole } from '@/enums/roles.enum';

export default async (dataSource: DataSource) => {
  // Obtém o repositório padrão diretamente do DataSource
  const usuarioRepository = dataSource.getRepository(UsuarioEntity);

  const usuarios = [
    {
      nome: 'Admin',
      email: 'admin@example.com',
      senha: await hash('123456', 10),
      role: UsuarioRole.ADMIN,
    },
    {
      nome: 'usuario',
      email: 'usuario@example.com',
      senha: await hash('123456', 10),
      role: UsuarioRole.USER,
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
    } else {
      console.log(`Usuário ${usuario.email} já existe.`);
    }
  }
};
