import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsersService } from '../services/users.service';
import { User } from '../models/user';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthGuard implements CanActivate {

  private LoggedInUser: User[] = [];

  constructor (private readonly route: Router, private readonly _userService: UsersService) {}

  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return this._userService.getUsers()
    .map( users => { 
      this.LoggedInUser = users.filter(user => user.logged === true);
      console.log('login users', this.LoggedInUser);
      if (this.LoggedInUser.length) {
        return true;
      } else {
        this.route.navigate(['/login']);
      }
    }).catch(() => {
      this.route.navigate(['/login']);
      return Observable.of(false);
    })

  }
}
