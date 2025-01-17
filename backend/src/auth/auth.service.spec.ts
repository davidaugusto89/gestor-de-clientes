import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsuariosService } from '@/usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { MailerService } from '@/mailer/mailer.service';
import { UsuarioRole } from '@/enums/roles.enum';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

describe('AuthService', () => {
  let authService: AuthService;
  let usuarioService: UsuariosService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsuariosService,
          useValue: {
            findByEmail: jest.fn(),
            saveResetToken: jest.fn(),
            findByResetToken: jest.fn(),
            updatePassword: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: MailerService,
          useValue: {
            sendResetPasswordEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usuarioService = module.get<UsuariosService>(UsuariosService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should return a JWT token if login is successful', async () => {
    const mockUser = {
      id: BigInt(1),
      email: 'test@example.com',
      senha: '$2b$10$6U48Rh7lWUBuZeIGhoAhsOztjrYPFJyw6r7L39xCuFZmxJjt.OwOy',
      nome: 'Test User',
      role: UsuarioRole.USER,
      resetToken: null,
      resetTokenExpiration: null,
      DataHoraCadastro: new Date(),
    };
    const mockLoginDto = { email: 'test@example.com', senha: 'password' };

    jest.spyOn(usuarioService, 'findByEmail').mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    jest.spyOn(jwtService, 'sign').mockReturnValue('mockToken');

    const result = await authService.login(mockLoginDto);

    expect(usuarioService.findByEmail).toHaveBeenCalledWith('test@example.com');
    expect(bcrypt.compare).toHaveBeenCalledWith(
      mockLoginDto.senha,
      mockUser.senha,
    );
    expect(jwtService.sign).toHaveBeenCalled();
    expect(result).toEqual({ access_token: 'mockToken' });
  });

  it('should throw UnauthorizedException if user is not found', async () => {
    const mockLoginDto = { email: 'test@example.com', senha: 'password' };

    jest.spyOn(usuarioService, 'findByEmail').mockResolvedValue(null);

    await expect(authService.login(mockLoginDto)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
