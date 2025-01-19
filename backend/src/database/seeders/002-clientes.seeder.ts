import { DataSource } from 'typeorm';
import { ClienteEntity } from '@/clientes/entities/cliente.entity';
import { UsuarioEntity } from '@/usuarios/entities/usuario.entity';

export default async (dataSource: DataSource) => {
  const clienteRepository = dataSource.getRepository(ClienteEntity);
  const usuarioRepository = dataSource.getRepository(UsuarioEntity);

  // Usuário padrão para os clientes
  const adminUsuario = await usuarioRepository.findOneBy({
    email: 'admin@example.com',
  });
  if (!adminUsuario) {
    console.error(
      'Usuário admin@example.com não encontrado. Seeder de clientes não pode ser executado.',
    );
    return;
  }

  const clientes = [
    {
      idUsuario: adminUsuario.id,
      codigo: 'C001',
      nome: 'Cliente 1',
      cpfCnpj: '87776036056',
      cep: 12345678,
      logradouro: 'Rua das Flores',
      endereco: 'Casa A',
      numero: '10',
      bairro: 'Centro',
      cidade: 'São Paulo',
      uf: 'SP',
      complemento: undefined,
      fone: '11999999999',
      limiteCredito: 1000.0,
      validade: '2025-01-01',
    },
    {
      idUsuario: adminUsuario.id,
      codigo: 'C002',
      nome: 'Cliente 2',
      cpfCnpj: '53334748006',
      cep: 87654321,
      logradouro: 'Avenida Paulista',
      endereco: 'Apartamento 101',
      numero: '20',
      bairro: 'Bela Vista',
      cidade: 'São Paulo',
      uf: 'SP',
      complemento: undefined,
      fone: '11888888888',
      limiteCredito: 2000.0,
      validade: '2025-06-01',
    },
  ];

  for (const cliente of clientes) {
    if (cliente.complemento === null) {
      cliente.complemento = undefined;
    }

    const novoCliente = clienteRepository.create(cliente);
    await clienteRepository.save(novoCliente);
    console.log(`Cliente ${cliente.nome} criado com sucesso.`);
  }
};
