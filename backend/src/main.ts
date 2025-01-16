import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Adicione um prefixo global para rotas, se necessário
  app.setGlobalPrefix('api');

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Documentação da API - QEntregas')
    .setDescription(
      'Esta é a documentação da API para o projeto de exemplo da QEntregas. A API oferece endpoints para gerenciar clientes. Utiliza boas práticas de desenvolvimento, incluindo autenticação JWT e validação com DTOs.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .addTag('Health', 'Endpoints de saúde da API')
    .addTag('Autenticação', 'Endpoints para autenticação')
    .addTag('Usuários', 'Endpoints para cadastro e gerenciamento de usuários')
    .addTag('Clientes', 'Endpoints para cadastro e gerenciamento de clientes')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);

  console.log('🚀 Backend rodando em http://localhost:3000/api');
}
bootstrap();
