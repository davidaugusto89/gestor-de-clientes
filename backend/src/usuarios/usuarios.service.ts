import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { UsuarioEntity } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import moment from 'moment';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly userRepository: Repository<UsuarioEntity>,
  ) {}

  /**
   * Cria um novo usuário.
   *
   * @param data - Dados do usuário
   * @throws {Error} se a senha não for informada
   * @returns o usuário criado
   */
  async createUsuario(data: Partial<UsuarioEntity>): Promise<UsuarioEntity> {
    if (!data.senha) {
      throw new Error('senha is required');
    }
    data.senha = await hash(data.senha, 10);
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  /**
   * Procura um usuário pelo seu e-mail.
   * @param email - E-mail do usuário
   * @returns o usuário encontrado ou null se n o encontrado
   */
  async findByEmail(email: string): Promise<UsuarioEntity | null> {
    return this.userRepository.findOneBy({ email });
  }

  /**
   * Procura um usuário pelo seu token de reset.
   *
   * @param token - Token de reset
   * @returns o usuário encontrado ou null se n o encontrado
   */
  async findByResetToken(token: string): Promise<UsuarioEntity | null> {
    const user = await this.userRepository.findOne({
      where: {
        resetToken: token,
        resetTokenExpiration: MoreThanOrEqual(new Date()),
      },
    });

    return user || null;
  }

  /**
   * Atualiza a senha do usuário.
   *
   * @param userId - Id do usuário
   * @param newPassword - Nova senha do usuário
   * @throws {Error} se o usuário n o for encontrado
   */
  async updatePassword(userId: bigint, newPassword: string): Promise<void> {
    await this.userRepository.update({ id: userId }, { senha: newPassword });
  }

  /**
   * Salva o token de reset de senha do usuário.
   * Caso o token seja nulo, remove o token e a data de expira o.
   *
   * @param userId - Id do usuário
   * @param resetToken - Token de reset de senha
   * @throws {Error} se o usuário n o for encontrado
   */
  async saveResetToken(userId: bigint, resetToken: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const resetTokenExpiration = resetToken
      ? moment().add(1, 'hour').toDate()
      : null;

    user.resetToken = resetToken;
    user.resetTokenExpiration = resetTokenExpiration;

    await this.userRepository.save(user);
  }

  /**
   * Procura todos os usuários.
   *
   * @returns Um array com todos os usuários encontrados.
   */
  async findAll(): Promise<UsuarioEntity[]> {
    return this.userRepository.find();
  }
}
