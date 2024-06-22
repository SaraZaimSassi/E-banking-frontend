

import  {HttpInterceptor, HttpRequest, HttpHandler ,HttpEvent} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, from, Observable, throwError} from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("******")
    console.log(request.url);
    if(!request.url.includes("/auth/login")){
      let newRequest= request.clone({
        headers: request.headers.set('Authorisation','Bearer'+this.authService.accessToken)
      })
      return next.handle(newRequest).pipe(
        catchError(err=>{
          if(err.status==401){
            this.authService.logout();
          }
          return throwError(err.message)
        })
      );
    }else return next.handle(request);

  }
}
