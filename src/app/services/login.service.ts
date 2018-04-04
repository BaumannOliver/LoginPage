import { Injectable } from '@angular/core';
import { ILogin } from '../interfaces/i-login';
import { environment } from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';
import {UsersService} from "./users.service";
import { AlertService } from './alert.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoginService implements ILogin {

  private readonly _url = environment.apiURL;
  private userToLogIn: User = new User();
  private readonly httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private readonly _http: HttpClient, private readonly _userService: UsersService,
    private readonly _alertService: AlertService, private readonly _router: Router) {}

  login(userName: string, password: string) {
    this._userService.getUser(userName)
      .subscribe(
        user => {
          this.userToLogIn = user;
          if (this.userToLogIn[0].password !== password) {
            this._alertService.error('Username or Password wrong');
          } else {
            this.userToLogIn[0].logged = true;
            this._http.put(this._url, this.userToLogIn[0], this.httpOptions).subscribe( () => {
              this._alertService.success('User logged in');
              this._router.navigate(['']);
            })
          }
          
        },
        err => {
          this._alertService.error('User unkwon');
          console.log(err);
        })
  }

  logout(userName: string) {
    this.userToLogIn.logged = false;
    localStorage.clear();
    return this._http.put(`${this._url}/${userName}`, this.userToLogIn.logged, this.httpOptions);
  }

}
