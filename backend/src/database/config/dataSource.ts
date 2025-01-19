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

// Crie o objeto de DataSource
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

// Função que tenta se conectar e, em caso de erro, aguarda alguns segundos e tenta de novo.
export async function initializeDatabaseWithRetry(retryDelay = 5000) {
  try {
    await AppDataSource.initialize();
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar no banco de dados:', error);
    console.log(`Tentando reconexão em ${retryDelay / 1000} segundos...`);
    setTimeout(() => initializeDatabaseWithRetry(retryDelay), retryDelay);
  }
}
