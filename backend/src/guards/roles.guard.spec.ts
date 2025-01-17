import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';
import { UsuarioRole } from '@/enums/roles.enum';

describe('RolesGuard', () => {
  let rolesGuard: RolesGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = {
      getAllAndOverride: jest.fn(),
    } as unknown as Reflector;

    rolesGuard = new RolesGuard(reflector);
  });

  it('should be defined', () => {
    expect(rolesGuard).toBeDefined();
  });

  describe('canActivate', () => {
    const createMockExecutionContext = (user: any) => ({
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: jest.fn(() => ({
        getRequest: jest.fn(() => ({ user })),
        getResponse: jest.fn(),
        getNext: jest.fn(),
      })),
    });

    it('should allow access if user has the required role', () => {
      reflector.getAllAndOverride = jest
        .fn()
        .mockReturnValue([UsuarioRole.ADMIN]);

      const mockContext = createMockExecutionContext({
        role: UsuarioRole.ADMIN,
      });

      const result = rolesGuard.canActivate(
        mockContext as unknown as ExecutionContext,
      );
      expect(result).toBe(true);
    });

    it('should throw ForbiddenException if user is not authenticated', () => {
      reflector.getAllAndOverride = jest
        .fn()
        .mockReturnValue([UsuarioRole.ADMIN]);

      const mockContext = createMockExecutionContext(null);

      expect(() =>
        rolesGuard.canActivate(mockContext as unknown as ExecutionContext),
      ).toThrow(ForbiddenException);
    });

    it('should throw ForbiddenException if user does not have the required role', () => {
      reflector.getAllAndOverride = jest
        .fn()
        .mockReturnValue([UsuarioRole.ADMIN]);

      const mockContext = createMockExecutionContext({
        role: UsuarioRole.USER,
      });

      expect(() =>
        rolesGuard.canActivate(mockContext as unknown as ExecutionContext),
      ).toThrow(ForbiddenException);
    });
  });
});
