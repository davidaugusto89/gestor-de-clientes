import { Test, TestingModule } from '@nestjs/testing';
import { ClientesService } from './clientes.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ClienteEntity } from './entities/cliente.entity';
import { NotFoundException } from '@nestjs/common';
import {
  mockCliente,
  mockCreateClienteDto,
  mockUpdateClienteDto,
} from './mocks/clientes.mock';

describe('ClientesService', () => {
  let clientesService: ClientesService;
  let clienteRepository: Repository<ClienteEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientesService,
        {
          provide: getRepositoryToken(ClienteEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    clientesService = module.get<ClientesService>(ClientesService);
    clienteRepository = module.get<Repository<ClienteEntity>>(
      getRepositoryToken(ClienteEntity),
    );
  });

  it('should be defined', () => {
    expect(clientesService).toBeDefined();
    expect(clienteRepository).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a new cliente', async () => {
      jest.spyOn(clienteRepository, 'create').mockReturnValue(mockCliente);
      jest.spyOn(clienteRepository, 'save').mockResolvedValue(mockCliente);

      const result = await clientesService.create(mockCreateClienteDto);

      expect(clienteRepository.create).toHaveBeenCalledWith(
        mockCreateClienteDto,
      );
      expect(clienteRepository.save).toHaveBeenCalledWith(mockCliente);
      expect(result).toEqual(mockCliente);
    });
  });

  describe('findAll', () => {
    it('should return an array of clientes', async () => {
      jest.spyOn(clienteRepository, 'find').mockResolvedValue([mockCliente]);

      const result = await clientesService.findAll();

      expect(clienteRepository.find).toHaveBeenCalled();
      expect(result).toEqual([mockCliente]);
    });
  });

  describe('findOne', () => {
    it('should return a cliente if found', async () => {
      jest.spyOn(clienteRepository, 'findOneBy').mockResolvedValue(mockCliente);

      const result = await clientesService.findOne(mockCliente.id);

      expect(clienteRepository.findOneBy).toHaveBeenCalledWith({
        id: mockCliente.id,
      });
      expect(result).toEqual(mockCliente);
    });

    it('should throw NotFoundException if cliente is not found', async () => {
      jest.spyOn(clienteRepository, 'findOneBy').mockResolvedValue(null);

      await expect(clientesService.findOne(mockCliente.id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update and return the updated cliente', async () => {
      const updatedCliente = {
        ...mockCliente,
        ...mockUpdateClienteDto,
        validade: new Date('2025-01-01'),
      };

      jest.spyOn(clienteRepository, 'findOneBy').mockResolvedValue(mockCliente);
      jest.spyOn(clienteRepository, 'save').mockResolvedValue(updatedCliente);

      const result = await clientesService.update(
        mockCliente.id,
        mockUpdateClienteDto,
      );

      expect(clienteRepository.save).toHaveBeenCalledWith(updatedCliente);
      expect(result).toEqual(updatedCliente);
    });

    it('should throw NotFoundException if cliente to update is not found', async () => {
      jest.spyOn(clienteRepository, 'findOneBy').mockResolvedValue(null);

      await expect(
        clientesService.update(mockCliente.id, mockUpdateClienteDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove the cliente if found', async () => {
      jest.spyOn(clienteRepository, 'findOneBy').mockResolvedValue(mockCliente);
      jest.spyOn(clienteRepository, 'remove').mockResolvedValue(mockCliente);

      await clientesService.remove(mockCliente.id);

      expect(clienteRepository.remove).toHaveBeenCalledWith(mockCliente);
    });

    it('should throw NotFoundException if cliente to remove is not found', async () => {
      jest.spyOn(clienteRepository, 'findOneBy').mockResolvedValue(null);

      await expect(clientesService.remove(mockCliente.id)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
