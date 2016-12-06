import { AuthenticationService } from '../shared/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  public emailAddress: string;
  public password: string;
  public invalidPassword: boolean;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() { }

  login() {
    let router = this.router;
    this.authService.login(this.emailAddress, this.password).subscribe((success) => {
      if (success) {
       router.navigate(['timesheet', 'current']);
      } else {
        this.password = '';
        this.invalidPassword = true;
      }
    });
  }
}
