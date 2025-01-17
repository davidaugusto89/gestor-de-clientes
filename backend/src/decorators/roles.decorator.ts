import { UsuarioRole } from '@/enums/roles.enum';
import { SetMetadata } from '@nestjs/common';

/**
 * Decorator para definir as roles permitidas para uma rota
 */
export const ROLES_KEY = 'roles';
export const Roles = (...roles: UsuarioRole[]) => SetMetadata(ROLES_KEY, roles);
