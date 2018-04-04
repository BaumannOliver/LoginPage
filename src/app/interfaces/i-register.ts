import {User} from '../models/user';

export interface IRegister {
  saveUser(user: User);
}
