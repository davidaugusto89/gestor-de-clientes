import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrai o token do header
      ignoreExpiration: false, // Rejeita tokens expirados
      secretOrKey:
        configService.get<string>('JWT_SECRET') || 'defaultSecretKey', // Segredo usado para verificar o token
    });
  }

  async validate(payload: any) {
    // Validação personalizada do token (ex.: verificar payload)
    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.role,
    };
  }
}
