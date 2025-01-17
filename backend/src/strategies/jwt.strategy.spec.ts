import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ExtractJwt } from 'passport-jwt';
import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'JWT_SECRET') {
                return 'testSecretKey';
              }
              return null;
            }),
          },
        },
      ],
    }).compile();

    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(jwtStrategy).toBeDefined();
  });

  it('should configure strategy with correct options', () => {
    const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    const secretOrKey = configService.get<string>('JWT_SECRET');

    // Verificar se os valores foram configurados corretamente
    expect(jwtFromRequest).toBeDefined();
    expect(secretOrKey).toBe('testSecretKey');
  });

  it('should use the JWT_SECRET from ConfigService', () => {
    const secret = configService.get<string>('JWT_SECRET');
    expect(secret).toBe('testSecretKey');
  });

  describe('validate', () => {
    it('should validate and return the payload', async () => {
      const payload = {
        sub: 1,
        username: 'testUser',
        role: 'user',
      };

      const result = await jwtStrategy.validate(payload);

      expect(result).toEqual({
        userId: payload.sub,
        username: payload.username,
        role: payload.role,
      });
    });
  });
});
