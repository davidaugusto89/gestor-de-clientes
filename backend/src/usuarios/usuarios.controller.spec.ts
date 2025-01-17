import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { NotFoundException } from '@nestjs/common';
import {
  mockUsuario,
  mockCreateUsuarioDto,
  mockUpdatePasswordDto,
} from './mocks/usuarios.mock';

describe('UsuariosController', () => {
  let usuariosController: UsuariosController;
  let usuariosService: UsuariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuariosController],
      providers: [
        {
          provide: UsuariosService,
          useValue: {
            createUsuario: jest.fn(),
            findByEmail: jest.fn(),
            findByResetToken: jest.fn(),
            updatePassword: jest.fn(),
          },
        },
      ],
    }).compile();

    usuariosController = module.get<UsuariosController>(UsuariosController);
    usuariosService = module.get<UsuariosService>(UsuariosService);
  });

  it('should be defined', () => {
    expect(usuariosController).toBeDefined();
    expect(usuariosService).toBeDefined();
  });

  describe('create', () => {
    it('should call usuariosService.createUsuario and return the created usuario', async () => {
      jest
        .spyOn(usuariosService, 'createUsuario')
        .mockResolvedValue(mockUsuario);

      const result = await usuariosController.create(mockCreateUsuarioDto);

      expect(usuariosService.createUsuario).toHaveBeenCalledWith(
        mockCreateUsuarioDto,
      );
      expect(result).toEqual(mockUsuario);
    });
  });

  describe('findByEmail', () => {
    it('should return a usuario if found', async () => {
      jest.spyOn(usuariosService, 'findByEmail').mockResolvedValue(mockUsuario);

      const result = await usuariosController.findByEmail(mockUsuario.email);

      expect(usuariosService.findByEmail).toHaveBeenCalledWith(
        mockUsuario.email,
      );
      expect(result).toEqual(mockUsuario);
    });

    it('should throw NotFoundException if usuario is not found', async () => {
      jest.spyOn(usuariosService, 'findByEmail').mockResolvedValue(null);

      await expect(
        usuariosController.findByEmail(mockUsuario.email),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByResetToken', () => {
    it('should return a usuario if token is valid', async () => {
      jest
        .spyOn(usuariosService, 'findByResetToken')
        .mockResolvedValue(mockUsuario);

      const result = await usuariosController.findByResetToken('validToken');

      expect(usuariosService.findByResetToken).toHaveBeenCalledWith(
        'validToken',
      );
      expect(result).toEqual(mockUsuario);
    });

    it('should throw NotFoundException if token is invalid', async () => {
      jest.spyOn(usuariosService, 'findByResetToken').mockResolvedValue(null);

      await expect(
        usuariosController.findByResetToken('invalidToken'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('updatePassword', () => {
    it('should call usuariosService.updatePassword with correct parameters', async () => {
      jest
        .spyOn(usuariosService, 'updatePassword')
        .mockResolvedValue(undefined);

      await usuariosController.updatePassword(
        mockUpdatePasswordDto.id,
        mockUpdatePasswordDto.novaSenha,
      );

      expect(usuariosService.updatePassword).toHaveBeenCalledWith(
        mockUpdatePasswordDto.id,
        mockUpdatePasswordDto.novaSenha,
      );
    });

    it('should throw an error if newPassword is not provided', async () => {
      await expect(
        usuariosController.updatePassword(mockUpdatePasswordDto.id, ''),
      ).rejects.toThrowError('A nova senha é obrigatória.');
    });
  });
});
