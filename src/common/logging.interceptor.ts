import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const { method, originalUrl } = request;
    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - startTime;
        const statusCode = response.statusCode ?? 200;
        this.logger.log(
          `${method} ${originalUrl} ${statusCode} - ${duration}ms`,
        );
      }),
      catchError((error) => {
        const duration = Date.now() - startTime;
        const statusCode = response.statusCode ?? 500;
        this.logger.error(
          `${method} ${originalUrl} ${statusCode} - ${duration}ms`,
          error?.stack,
        );
        return throwError(() => error);
      }),
    );
  }
}
