import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError(error => {
          // If the error is already a HttpException, you can customize it further
          if (error instanceof HttpException) {
            return throwError(() => new HttpException({
              status: error.getStatus(),
              error: error.message,
              cause: error.cause,
              timestamp: new Date().toISOString(),
              path: context.switchToHttp().getRequest().url
            }, error.getStatus()));
          }

          // For unexpected errors, return a generic 500 error
          return throwError(() => new HttpException({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Internal server error',
            cause: error.cause,
            message: error.message || 'Something went wrong',
            timestamp: new Date().toISOString(),
            path: context.switchToHttp().getRequest().url
          }, HttpStatus.INTERNAL_SERVER_ERROR));
        })
      );
  }
}
