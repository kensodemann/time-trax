import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Project } from '../../models/project';
import { environment } from '../../../../environments/environment';

import 'rxjs/add/operator/map';

@Injectable()
export class ProjectService {

  constructor(private http: Http) { }

  getAll(): Observable<Array<Project>> {
    return this.http.get(`${environment.dataService}/projects`)
      .map(res => res.json());
  }
  
}
