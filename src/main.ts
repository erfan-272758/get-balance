import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLogger } from './logger/logger.service';
import { LoggerMiddleware } from './logger/logger.middleware';
let ml: MyLogger;
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  ml = app.get(MyLogger);
  app.useLogger(ml);
  // app.use(new LoggerMiddleware(ml));
  await app.listen(3000);
}

process.on('SIGTERM', () => {
  ml.close();
});
bootstrap();
