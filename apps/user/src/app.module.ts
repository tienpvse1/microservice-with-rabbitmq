import config from '@app/config';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { AuthModule } from './modules/auth/auth.module';
@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.getOrThrow('userDatabase.host'),
        port: 5432,
        username: config.getOrThrow('userDatabase.username'),
        password: config.getOrThrow('userDatabase.password'),
        database: config.getOrThrow('userDatabase.name'),
        entities: [],
        logger: 'advanced-console',
        synchronize: true,
        logging: 'all',
      }),
    }),
  ],
  providers: [
    Logger,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
