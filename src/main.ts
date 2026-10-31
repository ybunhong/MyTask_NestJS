import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { LoggingInterceptor } from './common/logging.interceptor.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.NODE_ENV === 'production'
        ? ['log', 'error', 'warn']
        : ['log', 'error', 'warn', 'debug'],
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
