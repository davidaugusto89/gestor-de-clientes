import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Adicione um prefixo global para rotas, se necessário
  app.setGlobalPrefix('api');

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Documentação da API - QEntregas') // Título da documentação
    .setDescription(
      'Esta é a documentação da API para o projeto de exemplo da QEntregas. A API oferece endpoints para gerenciar clientes. Utiliza boas práticas de desenvolvimento, incluindo autenticação JWT e validação com DTOs.',
    ) // Descrição mais detalhada
    .setVersion('1.0') // Versão inicial da API
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    ) // Configuração para autenticação JWT
    .addTag('Health', 'Endpoints de saude da API') // Categoria geral
    .addTag('Autenticação', 'Endpoints para autenticação') // Outra categoria específica
    .addTag('Usuários', 'Endpoints para cadastro e gerenciamento de usuários') // Outra categoria específica
    .addTag('Clientes', 'Endpoints para cadastro e gerenciamento de clientes') // Outra categoria específica
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);

  console.log('🚀 Backend rodando em http://localhost:3000/api');
}
bootstrap();
