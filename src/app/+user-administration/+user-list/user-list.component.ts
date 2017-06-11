import { Component, OnInit } from '@angular/core';

import { UserService } from '../../data/services/user/user.service';
import { User } from '../../data/models/user';

@Component({
  selector: 'trx-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  private users: Array<User>;

  filterText: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAll().subscribe(u => this.users = u);
  }

  editUser(user: User): void { }

  filteredUsers(): Array<User> {
    const str = this.filterText ? this.filterText.toLowerCase() : '';
    return this.users ? this.users.filter(u => u.firstName.toLowerCase().includes(str) ||
      u.lastName.toLowerCase().includes(str) ||
      u.username.toLowerCase().includes(str)) : [];
  }

  newUser(): void { }

}
