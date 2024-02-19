import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
  class AuthGuardService {
  
    constructor(private router: Router) {}
  
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let loggedIn = localStorage.getItem('isLoggedIn');
        if (loggedIn == 'true')
            return true;
        else {
            this.router.navigate(['/login']);
            return false
        }
    }
  }
  
  export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return inject(AuthGuardService).canActivate(next, state);
  }