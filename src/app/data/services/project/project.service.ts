import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { DataService } from '../data-service.interface';
import { Project } from '../../models/project';
import { environment } from '../../../../environments/environment';

import 'rxjs/add/operator/map';

@Injectable()
export class ProjectService implements DataService<Project> {
  private url: string;

  constructor(private http: Http) {
    this.url = `${environment.dataService}/projects`;
  }

  getAll(): Observable<Array<Project>> {
    return this.http.get(this.url)
      .map((res) => {
        const data = res.json();
        const projects: Array<Project> = [];
        data.forEach(p => projects.push(new Project(p)));
        return projects;
      });
  }

  get(id: string): Observable<Project> {
    if (!id) {
      throw new Error('ProjectService.get() called without id');
    }

    return this.http.get(`${this.url}/${id}`)
      .map(res => new Project(res.json()));
  }

  save(project: Project): Observable<Project> {
    return this.http.post(this.url + (project._id ? `/${project._id}` : ''), project)
      .map(res => res.json());
  }

}
