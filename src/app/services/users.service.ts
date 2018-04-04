import { Injectable } from '@angular/core';
import {IUsers} from '../interfaces/i-users';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../models/user';
import {Observable} from "rxjs/Observable";

@Injectable()
export class UsersService implements IUsers {

  private readonly _url = environment.apiURL;

  constructor(private readonly _http: HttpClient) { }

  getUser(userName: string): Observable<User> {
    return this._http.get<User>(`${this._url}/${userName}`);
  }

  getUsers(): Observable<User[]> {
    return this._http.get<User[]>(this._url);
  }

}
