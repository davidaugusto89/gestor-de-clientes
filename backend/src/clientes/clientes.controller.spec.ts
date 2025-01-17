import { Test, TestingModule } from '@nestjs/testing';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';
import {
  mockCliente,
  mockCreateClienteDto,
  mockUpdateClienteDto,
} from './mocks/clientes.mock';

describe('ClientesController', () => {
  let clientesController: ClientesController;
  let clientesService: ClientesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientesController],
      providers: [
        {
          provide: ClientesService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    clientesController = module.get<ClientesController>(ClientesController);
    clientesService = module.get<ClientesService>(ClientesService);
  });

  it('should be defined', () => {
    expect(clientesController).toBeDefined();
  });

  describe('create', () => {
    it('should call clientesService.create with the correct parameters', async () => {
      jest.spyOn(clientesService, 'create').mockResolvedValue(mockCliente);

      const result = await clientesController.create(mockCreateClienteDto);

      expect(clientesService.create).toHaveBeenCalledWith(mockCreateClienteDto);
      expect(result).toEqual(mockCliente);
    });
  });

  describe('findAll', () => {
    it('should call clientesService.findAll and return an array of clientes', async () => {
      const mockClientes = [mockCliente];

      jest.spyOn(clientesService, 'findAll').mockResolvedValue(mockClientes);

      const result = await clientesController.findAll();

      expect(clientesService.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockClientes);
    });
  });

  describe('findOne', () => {
    it('should call clientesService.findOne with the correct ID and return the cliente', async () => {
      jest.spyOn(clientesService, 'findOne').mockResolvedValue(mockCliente);

      const result = await clientesController.findOne(mockCliente.id);

      expect(clientesService.findOne).toHaveBeenCalledWith(mockCliente.id);
      expect(result).toEqual(mockCliente);
    });
  });

  describe('update', () => {
    it('should call clientesService.update with the correct parameters', async () => {
      const updatedCliente = {
        ...mockCliente,
        ...mockUpdateClienteDto,
        validade: new Date('2025-01-01'),
      };

      jest.spyOn(clientesService, 'update').mockResolvedValue(updatedCliente);

      const result = await clientesController.update(
        mockCliente.id,
        mockUpdateClienteDto,
      );

      expect(clientesService.update).toHaveBeenCalledWith(
        mockCliente.id,
        mockUpdateClienteDto,
      );
      expect(result).toEqual(updatedCliente);
    });
  });

  describe('remove', () => {
    it('should call clientesService.remove with the correct ID', async () => {
      jest.spyOn(clientesService, 'remove').mockResolvedValue(undefined);

      const result = await clientesController.remove(mockCliente.id);

      expect(clientesService.remove).toHaveBeenCalledWith(mockCliente.id);
      expect(result).toBeUndefined();
    });
  });
});
