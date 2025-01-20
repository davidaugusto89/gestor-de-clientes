import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UsuarioRole } from '@/enums/roles.enum';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            register: jest.fn(),
            forgotPassword: jest.fn(),
            resetPassword: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', () => {
    it('should call authService.login with the correct parameters', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        senha: 'password',
      };

      const mockResult = {
        id: BigInt(1),
        email: loginDto.email,
        nome: 'Test User',
        role: UsuarioRole.USER,
        access_token: 'mockToken',
      };

      jest.spyOn(authService, 'login').mockResolvedValue(mockResult);

      const result = await authController.login(loginDto);

      expect(authService.login).toHaveBeenCalledWith(loginDto);
      expect(result).toEqual(mockResult);
    });
  });

  describe('register', () => {
    it('should call authService.register with the correct parameters', async () => {
      const registerDto: RegisterDto = {
        email: 'test@example.com',
        senha: 'password',
        nome: 'Test User',
      };

      const mockResult = {
        id: BigInt(1),
        email: registerDto.email,
        nome: registerDto.nome,
        role: UsuarioRole.USER,
        access_token: 'mockToken',
      };

      jest.spyOn(authService, 'register').mockResolvedValue(mockResult);

      const result = await authController.register(registerDto);

      expect(authService.register).toHaveBeenCalledWith(registerDto);
      expect(result).toEqual(mockResult);
    });
  });

  describe('forgotPassword', () => {
    it('should call authService.forgotPassword with the correct parameters', async () => {
      const forgotPasswordDto: ForgotPasswordDto = {
        email: 'test@example.com',
      };
      const mockResult = { message: 'Instructions sent to email' };

      jest.spyOn(authService, 'forgotPassword').mockResolvedValue(mockResult);

      const result = await authController.forgotPassword(forgotPasswordDto);

      expect(authService.forgotPassword).toHaveBeenCalledWith(
        forgotPasswordDto,
      );
      expect(result).toEqual(mockResult);
    });
  });

  describe('resetPassword', () => {
    it('should call authService.resetPassword with the correct parameters', async () => {
      const resetPasswordDto: ResetPasswordDto = {
        token: 'resetToken',
        novaSenha: 'newPassword',
      };
      const mockResult = { message: 'Password changed successfully' };

      jest.spyOn(authService, 'resetPassword').mockResolvedValue(mockResult);

      const result = await authController.resetPassword(resetPasswordDto);

      expect(authService.resetPassword).toHaveBeenCalledWith(resetPasswordDto);
      expect(result).toEqual(mockResult);
    });
  });
});
