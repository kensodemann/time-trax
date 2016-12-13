import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Stage } from '../../models/stage';
import { environment } from '../../../../environments/environment';

import 'rxjs/add/operator/map';

@Injectable()
export class StageService {
  private stages: Observable<Array<Stage>>;

  constructor(private http: Http) { }

  getAll(): Observable<Array<Stage>> {
    if (!this.stages) {
      this.stages = this.http.get(`${environment.dataService}/stages`)
      .map(res => res.json());
    }

    return this.stages;
  }
}