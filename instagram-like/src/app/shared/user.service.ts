export class UserService {
  set(userFromDatabase) {
    localStorage.setItem('user', JSON.stringify(userFromDatabase));
  }

  getProfile() {
   const user = localStorage.getItem('user');
   return JSON.parse(user);
  }

  destroy() {
    localStorage.removeItem('user');
  }
}
