import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { UsuarioEntity } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly userRepository: Repository<UsuarioEntity>,
  ) {}

  async createUsuario(data: Partial<UsuarioEntity>): Promise<UsuarioEntity> {
    if (!data.senha) {
      throw new Error('senha is required');
    }
    data.senha = await hash(data.senha, 10);
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<UsuarioEntity | null> {
    return this.userRepository.findOneBy({ email });
  }

  async findByResetToken(token: string): Promise<UsuarioEntity | null> {
    return this.userRepository.findOneBy({ resetToken: token });
  }

  async updatePassword(userId: bigint, newPassword: string): Promise<void> {
    await this.userRepository.update({ id: userId }, { senha: newPassword });
  }
}
