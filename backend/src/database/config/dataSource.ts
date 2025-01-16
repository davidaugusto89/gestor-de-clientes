import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { UsuarioEntity } from '@/usuarios/entities/usuario.entity';
import { ClienteEntity } from '@/clientes/entities/cliente.entity';

// Carregar as variáveis de ambiente
dotenv.config();

enum DatabaseType {
  MYSQL = 'mysql',
  MARIADB = 'mariadb',
  POSTGRES = 'postgres',
  SQLITE = 'sqlite',
  MSSQL = 'mssql',
}

export const AppDataSource = new DataSource({
  type: (process.env.DB_TYPE as DatabaseType) || DatabaseType.MARIADB,
  host: process.env.DB_HOST || 'database',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'user',
  password: process.env.DB_PASS || 'userpassword',
  database: process.env.DB_NAME || 'app_db',
  entities: [UsuarioEntity, ClienteEntity],
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  synchronize: false,
  logging: process.env.NODE_ENV !== 'production',
});
