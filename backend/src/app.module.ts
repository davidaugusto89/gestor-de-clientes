import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { AppDataSource } from '@/database/config/dataSource';
import { UsuariosModule } from '@/usuarios/usuarios.module';
import { ClientesModule } from '@/clientes/clientes.module';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        if (!AppDataSource.isInitialized) {
          await AppDataSource.initialize();
          console.log('🚀 DataSource inicializado com sucesso!');
        }
        return AppDataSource.options;
      },
    }),
    AuthModule,
    UsuariosModule,
    ClientesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
