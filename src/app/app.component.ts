import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from './shared/services/authentication/authentication.service';
import { AdministratorGuardService } from './core/administrator-guard/administrator-guard.service';
import { IdentityService } from './core/identity/identity.service';

@Component({
  selector: 'trx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userIsAdmin: boolean;

  constructor(private adminGuard: AdministratorGuardService, private auth: AuthenticationService, private identity: IdentityService) { }

  ngOnInit() {
    this.identity.changed.subscribe(u => this.doAccessCheck(u));
    this.identity.get().subscribe(u => { });
    this.auth.scheduleTokenRefresh();
  }

  private doAccessCheck(user: any): void {
    if (user) {
      this.adminGuard.canActivate().subscribe(a => this.userIsAdmin = a);
    } else {
      this.userIsAdmin = false;
    }
  }
}
