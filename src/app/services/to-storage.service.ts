import { Injectable } from '@angular/core';
import { longStackSupport } from 'q';

@Injectable()
export class ToStorageService {

  constructor() { }

  public isKeyPassword() {
    return localStorage.key(0)
  }
  public getFromLocaleStorage(): string {
    const string = localStorage.getItem('password');
    return string;
  }

  public writeToLocaleStorage(password) {
    localStorage.setItem('password', password)
  }

}
