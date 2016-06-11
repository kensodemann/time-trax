import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environment';

@Injectable()
export class AuthenticationService implements OnInit {
  private opts: RequestOptions;

  constructor(private http: Http) { }

  ngOnInit() {
    let headers: Headers = new Headers();
    headers.append('content-type', 'application/json; charset=utf-8');
    this.opts = new RequestOptions();
    this.opts.headers = headers;
  }

  login(userId: string, password: string) {
    let credentials = {
      username: userId,
      password: password
    };
    return this.http.post(`${environment.dataService}/login`, JSON.stringify(credentials), this.opts)
      .map(res=>res.json().success);
  }

  logout() { 
    return this.http.post(`${environment.dataService}/logout`, JSON.stringify({ logout: true }), this.opts);
  }
}
