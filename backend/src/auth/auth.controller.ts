import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Public } from '@/decorators/public.decorator';

@ApiTags('Auth')
@Controller('auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Realiza o login do usuário.
   * @param loginDto - Dados de autenticação do usuário
   * @throws {UnauthorizedException} se as credenciais forem inválidas
   * @returns um token de acesso JWT com as informações do usuário
   */
  @Post('login')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Login bem-sucedido' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  /**
   * Cria um novo usuário.
   * @param registerDto - Dados do novo usuário
   * @throws {ConflictException} se o e-mail já estiver em uso
   * @returns as informações do usuário criado e um token de acesso JWT
   */
  @Post('register')
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  /**
   * Envia um e-mail de redefini o de senha para o usu rio.
   * @param forgotPasswordDto - Dados do usu rio para redefini o de senha
   * @throws {UnauthorizedException} se o usu rio n o encontrado
   * @returns uma mensagem de sucesso
   */
  @Post('forgot-password')
  @ApiResponse({ status: 200, description: 'Instruções enviadas para o email' })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  /**
   * Redefine a senha do usuário utilizando o token de redefinição de senha.
   *
   * @param resetPasswordDto - Dados necessários para redefinição de senha, incluindo o token de reset e a nova senha
   * @returns uma mensagem de sucesso indicando que a senha foi alterada
   * @throws {UnauthorizedException} se o token for inválido ou expirado
   */
  @Post('reset-password')
  @ApiResponse({ status: 200, description: 'Senha alterada com sucesso' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
