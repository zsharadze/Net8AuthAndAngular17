import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpHeaders,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const router: Router = inject(Router);
  const token = localStorage.getItem('token') ?? '';

  if (req.url.indexOf('/identity/login') != -1 || req.url.indexOf('/identity/register') != -1) {
    //if requesting /identity/login endpoint process error in login.component.ts component. cause if email or password is incorrect /identity/login threw 401 not authorized exception.
    //and our interceptor on status == 401 is redirecting to login page.
    //also if registering with existing email /identity/register returned status 400 error and we want it to be handled in register.component.ts
    return next(req);
  } else {
    const cloned = req.clone({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    });

    return next(cloned).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error?.error instanceof ErrorEvent) {
          console.log('this is client side error');
          errorMsg = `Client Error: ${error?.error?.message}`;
        } else {
          console.log('this is server side error');
          errorMsg = `Server Error Code: ${error?.status}, Message: ${error?.message}`;
        }

        console.log(errorMsg);
        if(error?.status == 401){
          router.navigate(['/login']);
        }
        return throwError(() => errorMsg);
      })
    );
  }
};