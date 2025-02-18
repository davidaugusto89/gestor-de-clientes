import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UsuarioRole } from '@/enums/roles.enum';

/**
 * Guarda para verificar as roles de usuários
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UsuarioRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // Sem roles definidas, qualquer usuário autenticado pode acessar
    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      throw new ForbiddenException('Usuário não autenticado');
    }

    const hasRole = requiredRoles.some((role) => user.role === role);
    if (!hasRole) {
      throw new ForbiddenException('Acesso negado: Permissão insuficiente');
    }

    return true;
  }
}
