import { EventEmitter } from "@angular/core";

export class UserService {
  statusChange = new EventEmitter();
  set(userFromDatabase) {
    localStorage.setItem('user', JSON.stringify(userFromDatabase));
    this.statusChange.emit(userFromDatabase);
  }

  getProfile() {
   const user = localStorage.getItem('user');
   return JSON.parse(user);
  }

  destroy() {
    localStorage.removeItem('user');
    this.statusChange.emit(null);
  }
}
