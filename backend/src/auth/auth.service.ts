import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from '@/usuarios/usuarios.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usuarioService.findByEmail(loginDto.email);
    if (!user || !(await bcrypt.compare(loginDto.senha, user.senha))) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      nome: user.nome,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.senha, 10);
    return this.usuarioService.createUsuario({
      ...registerDto,
      senha: hashedPassword,
    });
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.usuarioService.findByEmail(forgotPasswordDto.email);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    // Aqui você pode enviar um email com um token para redefinir a senha
    return { message: 'Instruções enviadas para o email' };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const user = await this.usuarioService.findByResetToken(
      resetPasswordDto.token,
    );
    if (!user) {
      throw new UnauthorizedException('Token inválido');
    }

    const hashedPassword = await bcrypt.hash(resetPasswordDto.novaSenha, 10);
    await this.usuarioService.updatePassword(user.id, hashedPassword);
    return { message: 'Senha alterada com sucesso' };
  }
}
