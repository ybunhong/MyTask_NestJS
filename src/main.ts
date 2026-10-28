import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NextFunction, Request, Response } from 'express';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.NODE_ENV === 'production'
        ? ['log', 'error', 'warn']
        : ['log', 'error', 'warn', 'debug'],
  });
  app.useGlobalPipes(new ValidationPipe());

  app.use((req: Request, res: Response, next: NextFunction) => {
    const logger = new Logger('HTTP');
    const { method, originalUrl } = req;
    const startTime = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const duration = Date.now() - startTime;
      logger.log(`${method} ${originalUrl} ${statusCode} - ${duration}ms`);
    });

    next();
  });

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
