import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsuariosService } from '@/usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { MailerService } from '@/mailer/mailer.service';
import { UsuarioRole } from '@/enums/roles.enum';
import { UsuarioEntity } from '@/usuarios/entities/usuario.entity';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

jest.mock('crypto', () => ({
  ...jest.requireActual('crypto'),
  randomBytes: jest.fn(() => ({
    toString: jest.fn(() => 'mockResetToken'),
  })),
}));

describe('AuthService', () => {
  let authService: AuthService;
  let usuarioService: UsuariosService;
  let jwtService: JwtService;
  let mailerService: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsuariosService,
          useValue: {
            findByEmail: jest.fn(),
            createUsuario: jest.fn(),
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
    mailerService = module.get<MailerService>(MailerService);
  });

  describe('register', () => {
    it('should throw ConflictException if email is already in use', async () => {
      const registerDto = {
        email: 'test@example.com',
        senha: 'password',
        nome: 'Test',
      };

      const existingUser: UsuarioEntity = {
        id: BigInt(1),
        nome: registerDto.nome,
        email: registerDto.email,
        senha: 'hashedPassword',
        role: UsuarioRole.USER,
        resetToken: null,
        resetTokenExpiration: null,
        DataHoraCadastro: new Date(),
      };

      jest.spyOn(usuarioService, 'findByEmail').mockResolvedValue(existingUser);

      await expect(authService.register(registerDto)).rejects.toThrow(
        ConflictException,
      );
      expect(usuarioService.findByEmail).toHaveBeenCalledWith(
        registerDto.email,
      );
    });

    it('should create a new user and return user info with JWT token', async () => {
      const registerDto = {
        email: 'test@example.com',
        senha: 'password',
        nome: 'Test',
      };

      const newUser: UsuarioEntity = {
        id: BigInt(1),
        nome: registerDto.nome,
        email: registerDto.email,
        senha: 'hashedPassword',
        role: UsuarioRole.USER,
        resetToken: null,
        resetTokenExpiration: null,
        DataHoraCadastro: new Date(),
      };

      const hashedPassword = 'hashedPassword';

      jest.spyOn(usuarioService, 'findByEmail').mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      jest.spyOn(usuarioService, 'createUsuario').mockResolvedValue(newUser);
      jest.spyOn(jwtService, 'sign').mockReturnValue('mockToken');

      const result = await authService.register(registerDto);

      expect(usuarioService.createUsuario).toHaveBeenCalledWith({
        ...registerDto,
        senha: hashedPassword,
      });
      expect(jwtService.sign).toHaveBeenCalled();
      expect(result).toEqual({
        id: newUser.id,
        nome: newUser.nome,
        email: newUser.email,
        role: newUser.role,
        access_token: 'mockToken',
      });
    });
  });

  describe('forgotPassword', () => {
    it('should generate and send a reset token email', async () => {
      const forgotPasswordDto = { email: 'test@example.com' };
      const mockUser: UsuarioEntity = {
        id: BigInt(1),
        email: forgotPasswordDto.email,
        nome: 'Test User',
        senha: 'hashedPassword',
        role: UsuarioRole.USER,
        resetToken: null,
        resetTokenExpiration: null,
        DataHoraCadastro: new Date(),
      };

      jest.spyOn(usuarioService, 'findByEmail').mockResolvedValue(mockUser);
      jest.spyOn(usuarioService, 'saveResetToken').mockResolvedValue();
      jest.spyOn(mailerService, 'sendResetPasswordEmail').mockResolvedValue();

      const result = await authService.forgotPassword(forgotPasswordDto);

      expect(usuarioService.saveResetToken).toHaveBeenCalledWith(
        mockUser.id,
        'mockResetToken',
      );
      expect(mailerService.sendResetPasswordEmail).toHaveBeenCalledWith(
        mockUser.email,
        mockUser.nome,
        expect.stringContaining('mockResetToken'),
      );
      expect(result).toEqual({ message: 'Instruções enviadas para o email' });
    });
  });

  describe('resetPassword', () => {
    it('should throw UnauthorizedException if token is invalid or expired', async () => {
      const resetPasswordDto = {
        token: 'invalidToken',
        novaSenha: 'newPassword',
      };

      jest.spyOn(usuarioService, 'findByResetToken').mockResolvedValue(null);

      await expect(authService.resetPassword(resetPasswordDto)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(usuarioService.findByResetToken).toHaveBeenCalledWith(
        resetPasswordDto.token,
      );
    });

    it('should reset the user password successfully', async () => {
      const resetPasswordDto = {
        token: 'validToken',
        novaSenha: 'newPassword',
      };
      const mockUser: UsuarioEntity = {
        id: BigInt(1),
        nome: 'Test User',
        email: 'test@example.com',
        senha: 'oldPassword',
        role: UsuarioRole.USER,
        resetToken: null,
        resetTokenExpiration: null,
        DataHoraCadastro: new Date(),
      };
      const hashedPassword = 'hashedPassword';

      jest
        .spyOn(usuarioService, 'findByResetToken')
        .mockResolvedValue(mockUser);
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      jest.spyOn(usuarioService, 'updatePassword').mockResolvedValue();
      jest.spyOn(usuarioService, 'saveResetToken').mockResolvedValue();

      const result = await authService.resetPassword(resetPasswordDto);

      expect(usuarioService.updatePassword).toHaveBeenCalledWith(
        mockUser.id,
        hashedPassword,
      );
      expect(usuarioService.saveResetToken).toHaveBeenCalledWith(
        mockUser.id,
        '',
      );
      expect(result).toEqual({ message: 'Senha redefinida com sucesso' });
    });
  });

  describe('login', () => {
    it('should return a JWT token if login is successful', async () => {
      const loginDto = { email: 'test@example.com', senha: 'password' };

      const mockUser: UsuarioEntity = {
        id: BigInt(1),
        nome: 'Test User',
        email: loginDto.email,
        senha: 'hashedPassword',
        role: UsuarioRole.USER,
        resetToken: null,
        resetTokenExpiration: null,
        DataHoraCadastro: new Date(),
      };

      jest.spyOn(usuarioService, 'findByEmail').mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      jest.spyOn(jwtService, 'sign').mockReturnValue('mockToken');

      const result = await authService.login(loginDto);

      expect(usuarioService.findByEmail).toHaveBeenCalledWith(loginDto.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(
        loginDto.senha,
        mockUser.senha,
      );
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: mockUser.id,
        email: mockUser.email,
        nome: mockUser.nome,
        role: mockUser.role,
      });
      expect(result).toEqual({
        id: mockUser.id,
        nome: mockUser.nome,
        email: mockUser.email,
        role: mockUser.role,
        access_token: 'mockToken',
      });
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      const loginDto = { email: 'notfound@example.com', senha: 'password' };

      jest.spyOn(usuarioService, 'findByEmail').mockResolvedValue(null);

      await expect(authService.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );

      expect(usuarioService.findByEmail).toHaveBeenCalledWith(loginDto.email);
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      const loginDto = { email: 'test@example.com', senha: 'wrongpassword' };

      const mockUser: UsuarioEntity = {
        id: BigInt(1),
        nome: 'Test User',
        email: loginDto.email,
        senha: 'hashedPassword',
        role: UsuarioRole.USER,
        resetToken: null,
        resetTokenExpiration: null,
        DataHoraCadastro: new Date(),
      };

      jest.spyOn(usuarioService, 'findByEmail').mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(authService.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );

      expect(usuarioService.findByEmail).toHaveBeenCalledWith(loginDto.email);
      expect(bcrypt.compare).toHaveBeenCalledWith(
        loginDto.senha,
        mockUser.senha,
      );
    });
  });
});
