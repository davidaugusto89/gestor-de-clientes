import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from '@/app.service';

describe('AppController', () => {
  let appController: AppController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {},
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  describe('getStatus', () => {
    it('should return server status and timestamp', () => {
      const result = appController.getStatus();
      expect(result).toHaveProperty('status', 'Servidor está funcionando');
      expect(result).toHaveProperty('timestamp');
      expect(new Date(result.timestamp).toISOString()).toBe(result.timestamp); // Verifica se o timestamp é válido
    });
  });
});
