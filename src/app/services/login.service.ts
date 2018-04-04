import { Injectable } from '@angular/core';
import { ILogin } from '../interfaces/i-login';
import { environment } from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';
import {UsersService} from "./users.service";

@Injectable()
export class LoginService implements ILogin {

  private readonly _url = environment.apiURL;
  private userToLogIn: User = new User();
  private readonly httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private readonly _http: HttpClient, private readonly _userService: UsersService) {}

  login(userName: string) {
    this._userService.getUser(userName)
      .subscribe(
        user => {
          this.userToLogIn = user;
          console.log('user from api', this.userToLogIn);
          this.userToLogIn.logged = true;
          },
        err => {
          console.log(err);
          },
        () => {
          localStorage.setItem('user', userName);
          return this._http.put(this._url, this.userToLogIn, this.httpOptions);
        });
  }

  logout(userName: string) {
    this.userToLogIn.logged = false;
    localStorage.clear();
    return this._http.put(`${this._url}/${userName}`, this.userToLogIn.logged, this.httpOptions);
  }

}
