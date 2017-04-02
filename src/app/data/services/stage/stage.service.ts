import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { DataService } from '../data-service.interface';
import { Stage } from '../../models/stage';
import { environment } from '../../../../environments/environment';

import 'rxjs/add/operator/map';

@Injectable()
export class StageService implements DataService<Stage> {
  private stages: Observable<Array<Stage>>;

  constructor(private http: Http) { }

  getAll(): Observable<Array<Stage>> {
    if (!this.stages) {
      this.stages = this.http.get(`${environment.dataService}/stages`)
        .map((res) => {
          const stages: Array<Stage> = [];
          const data = res.json();
          data.forEach(stage => stages.push(new Stage(stage)));
          return stages;
        });
    }

    return this.stages;
  }
}
