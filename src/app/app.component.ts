import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from './shared/authentication/authentication.service';

@Component({
  selector: 'trx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    this.auth.scheduleTokenRefresh();
  }
}
