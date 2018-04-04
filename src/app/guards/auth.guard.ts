import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('user')) {
      return true;
    }
    this._router.navigate(['/login']);
    return false;
  }
}
