import { UsuarioRole } from '@/enums/roles.enum';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UsuarioRole[]) => SetMetadata(ROLES_KEY, roles);
