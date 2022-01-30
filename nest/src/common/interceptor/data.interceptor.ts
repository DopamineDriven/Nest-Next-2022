import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class DataInterceptor implements NestInterceptor {
  intercept<T = unknown extends PromiseLike<infer U> ? U : unknown>(
    context: ExecutionContext,
    next: CallHandler<T>
  ): Observable<T> {
    return next
      .handle()
      .pipe<T>(tap<T>(data => context.switchToHttp().getRequest.call(data)));
  }
}

/**
 * @Injectable()
export class DataInterceptor
  implements
    NestInterceptor<TemplateStringsArray, CallHandler<ExecutionContext>>
{
  intercept<T extends CallHandler>(
    context: ExecutionContext,
    next: T
  ): Observable<any> {
    return next
      .handle()
      .pipe<typeof context>(tap<ExecutionContext>(data => data))
      .pipe().subscribe(observer).add(this.intercept(context).subscribe(this.intercept().o))
  }
}

 */
