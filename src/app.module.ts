import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './common/validation.pipe';
import { LoggerModule } from './logger/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Balance } from 'Entity/balance.entity';

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'balance',
      entities: [Balance],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Balance]),
  ],
  controllers: [AppController],
  providers: [{ provide: APP_PIPE, useClass: ValidationPipe }, AppService],
})
export class AppModule {}
