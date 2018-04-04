import { Injectable } from '@angular/core';
import {IRegister} from '../interfaces/i-register';
import {User} from '../models/user';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class RegisterService implements IRegister {

  private readonly _url = environment.apiURL;
  private readonly httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private readonly _http: HttpClient) { }

  saveUser(user: User) {
    return this._http.post<User>(this._url, user, this.httpOptions);
  }

}
