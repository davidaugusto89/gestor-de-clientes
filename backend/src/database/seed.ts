import { AppDataSource } from './config/dataSource';
import { readdirSync } from 'fs';
import { join } from 'path';

(async () => {
  try {
    // Inicialize o DataSource
    const dataSource = await AppDataSource.initialize();
    console.log('Database connected.');

    // Caminho para os arquivos de seeders
    const seedersPath = join(__dirname, 'seeders');

    // Carregar dinamicamente todos os arquivos na pasta `seeders`
    const seederFiles = readdirSync(seedersPath).filter(
      (file) => file.endsWith('.ts') || file.endsWith('.js'),
    );

    // Executar cada seeder
    for (const file of seederFiles) {
      const { default: seederFunction } = await import(join(seedersPath, file));
      console.log(`Executando seeder: ${file}`);
      await seederFunction(dataSource);
    }

    console.log('Todos os seeders foram executados com sucesso.');
    process.exit(0);
  } catch (error) {
    console.error('Erro ao executar seeders:', error);
    process.exit(1);
  }
})();
