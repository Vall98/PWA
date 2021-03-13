import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  connected: boolean = false;
  user: User = new User("test");

  constructor() { }

}

class User {
  username: String = "";

  constructor(username: String) {
    this.username = username;
  }
}