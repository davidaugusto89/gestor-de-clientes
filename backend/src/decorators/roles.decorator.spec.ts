import { SetMetadata } from '@nestjs/common';
import { Roles, ROLES_KEY } from './roles.decorator';
import { UsuarioRole } from '@/enums/roles.enum';

jest.mock('@nestjs/common', () => ({
  ...jest.requireActual('@nestjs/common'),
  SetMetadata: jest.fn(),
}));

describe('Roles Decorator', () => {
  it('should set metadata with key "roles" and the provided roles', () => {
    const setMetadataMock = SetMetadata as jest.Mock;

    Roles(UsuarioRole.ADMIN, UsuarioRole.USER);

    expect(setMetadataMock).toHaveBeenCalledWith(ROLES_KEY, [
      UsuarioRole.ADMIN,
      UsuarioRole.USER,
    ]);
  });

  it('should set metadata with an empty array if no roles are provided', () => {
    const setMetadataMock = SetMetadata as jest.Mock;

    Roles();

    expect(setMetadataMock).toHaveBeenCalledWith(ROLES_KEY, []);
  });
});
