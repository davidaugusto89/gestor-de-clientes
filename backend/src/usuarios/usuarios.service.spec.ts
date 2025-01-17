import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosService } from './usuarios.service';
import { Repository, FindOperator } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsuarioEntity } from './entities/usuario.entity';
import * as bcrypt from 'bcrypt';
import { mockUsuario, mockCreateUsuarioDto } from './mocks/usuarios.mock';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn().mockResolvedValue('hashedPassword'),
}));

describe('UsuariosService', () => {
  let usuariosService: UsuariosService;
  let userRepository: Repository<UsuarioEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuariosService,
        {
          provide: getRepositoryToken(UsuarioEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findOneBy: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    usuariosService = module.get<UsuariosService>(UsuariosService);
    userRepository = module.get<Repository<UsuarioEntity>>(
      getRepositoryToken(UsuarioEntity),
    );
  });

  describe('createUsuario', () => {
    it('should create and save a new user', async () => {
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');

      jest.spyOn(userRepository, 'create').mockReturnValue({
        ...mockUsuario,
        ...mockCreateUsuarioDto,
        senha: 'hashedPassword',
      });

      jest.spyOn(userRepository, 'save').mockResolvedValue({
        ...mockUsuario,
        ...mockCreateUsuarioDto,
        senha: 'hashedPassword',
      });

      const result = await usuariosService.createUsuario(mockCreateUsuarioDto);

      expect(bcrypt.hash).toHaveBeenCalledWith(mockCreateUsuarioDto.senha, 10);

      expect(userRepository.create).toHaveBeenCalledWith({
        ...mockCreateUsuarioDto,
        senha: 'hashedPassword',
      });

      expect(userRepository.save).toHaveBeenCalled();
      expect(result).toEqual({
        ...mockUsuario,
        ...mockCreateUsuarioDto,
        senha: 'hashedPassword',
      });
    });
  });
  describe('findByResetToken', () => {
    it('should return a user if token is valid', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUsuario);

      const result = await usuariosService.findByResetToken('validToken');

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: {
          resetToken: 'validToken',
          resetTokenExpiration: expect.any(FindOperator),
        },
      });
      expect(result).toEqual(mockUsuario);
    });
  });

  describe('saveResetToken', () => {
    it('should save a reset token and expiration date for the user', async () => {
      const resetToken = 'resetToken';

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUsuario);
      jest.spyOn(userRepository, 'save').mockResolvedValue({
        ...mockUsuario,
        resetToken,
        resetTokenExpiration: new Date(),
      });

      await usuariosService.saveResetToken(mockUsuario.id, resetToken);

      expect(userRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockUsuario.id },
      });
      expect(userRepository.save).toHaveBeenCalledWith({
        ...mockUsuario,
        resetToken,
        resetTokenExpiration: expect.any(Date),
      });
    });
  });
});
