import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { UsuariosService } from '@/usuarios/usuarios.service';
import { MailerService } from '@/mailer/mailer.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuariosService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
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
    const { email, senha } = registerDto;

    const existingUser = await this.usuarioService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('O e-mail já está em uso.');
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const newUser = await this.usuarioService.createUsuario({
      ...registerDto,
      senha: hashedPassword,
    });

    const payload = {
      sub: newUser.id,
      email: newUser.email,
      nome: newUser.nome,
    };

    return {
      id: newUser.id,
      nome: newUser.nome,
      email: newUser.email,
      access_token: this.jwtService.sign(payload),
    };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.usuarioService.findByEmail(forgotPasswordDto.email);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    // Gera um token exclusivo
    const resetToken = crypto.randomBytes(64).toString('hex');

    // Salva o token no banco de dados associado ao usuário (ajuste para sua lógica)
    await this.usuarioService.saveResetToken(user.id, resetToken);

    // Gera o link de redefinição
    const resetLink = `${process.env.APP_URL}/reset-password?token=${resetToken}`;

    // Envia o e-mail de recuperação
    await this.mailerService.sendResetPasswordEmail(
      user.email,
      user.nome,
      resetLink,
    );

    return { message: 'Instruções enviadas para o email' };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { token, novaSenha } = resetPasswordDto;

    const user = await this.usuarioService.findByResetToken(token);
    if (!user) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }

    user.senha = await bcrypt.hash(novaSenha, 10);
    await this.usuarioService.updatePassword(user.id, user.senha);
    await this.usuarioService.saveResetToken(user.id, '');

    return { message: 'Senha redefinida com sucesso' };
  }
}
