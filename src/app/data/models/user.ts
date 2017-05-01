export class User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  isDefaultAdmin: boolean;
  roles: Array<string>;

  constructor(obj?: any) {
    if (obj) {
      this._id = obj._id;
      this.firstName = obj.firstName;
      this.lastName = obj.lastName;
      this.username = obj.username;
      this.isDefaultAdmin = obj.isDefaultAdmin;
      if (obj.roles) {
        this.roles = [];
        obj.roles.forEach(role => {
          this.roles.push(role);
        });
      }
    }
  }

  isAuthorized(role?: string): boolean {
    return !role || (this.roles && !!this.roles.find(r => r === role));
  }
}
