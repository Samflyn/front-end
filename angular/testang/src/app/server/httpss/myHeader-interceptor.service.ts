import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEventType,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class MyHeaderInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers = req.headers
      .set('Content-Type', 'application/json')
      .append('Admin', 'false');
    const authReq = req.clone({ headers }); // request object is immutable
    // return next.handle(authReq).pipe(
    //   // use response data
    //   tap((event) => {
    //     if (event.type === HttpEventType.Response) {
    //       console.log(event.body);
    //     }
    //   })
    // );
    return next.handle(authReq);
  }
}
