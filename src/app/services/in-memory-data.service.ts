import {InMemoryDbService} from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const Users = [
      {
        id: 1,
        username: 'testingUser',
        password: '12345678',
        firstName: 'FirstTestName',
        lastName: 'LastTestName',
        logged: false,
      }
    ];
    return {Users};
  }

}
