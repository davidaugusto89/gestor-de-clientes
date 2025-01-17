import { UsuarioRole } from '@/enums/roles.enum';
import { UsuarioEntity } from '../entities/usuario.entity';

export const mockUsuario: UsuarioEntity = {
  id: BigInt(1),
  email: 'test@example.com',
  senha: '$2b$10$6U48Rh7lWUBuZeIGhoAhsOztjrYPFJyw6r7L39xCuFZmxJjt.OwOy',
  nome: 'Test User',
  role: UsuarioRole.USER,
  resetToken: null,
  resetTokenExpiration: null,
  DataHoraCadastro: new Date(),
};

export const mockCreateUsuarioDto = {
  email: 'newuser@example.com',
  senha: 'hashedPassword',
  nome: 'New User',
};

export const mockUpdatePasswordDto = {
  id: BigInt(1),
  novaSenha: 'newSecurePassword',
};
