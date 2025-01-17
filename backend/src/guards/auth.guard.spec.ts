import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';

jest.mock('@nestjs/passport', () => ({
  AuthGuard: jest.fn(() => {
    return class {
      canActivate = jest.fn().mockResolvedValue(true);
    };
  }),
}));

describe('JwtAuthGuard', () => {
  let jwtAuthGuard: JwtAuthGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = {
      getAllAndOverride: jest.fn(),
    } as unknown as Reflector;

    jwtAuthGuard = new JwtAuthGuard(reflector);
  });

  it('should be defined', () => {
    expect(jwtAuthGuard).toBeDefined();
  });

  it('should extend AuthGuard with "jwt" strategy', () => {
    expect(AuthGuard).toHaveBeenCalledWith('jwt');
  });
});
