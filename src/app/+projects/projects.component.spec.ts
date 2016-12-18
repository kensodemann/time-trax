import { TestBed, async } from '@angular/core/testing';
import { Response } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { ProjectService } from '../data/services/project/project.service';
import { ProjectsComponent } from './projects.component';

import 'rxjs/add/observable/empty';

describe('Component: Projects', () => {
  beforeEach(() => {
    class DataService {
      getAll(): Observable<Response> {
        return Observable.empty();
      }
    }

    TestBed.configureTestingModule({
      declarations: [
        ProjectsComponent
      ],
      imports: [
        MaterialModule
      ],
      providers: [
        { provide: ProjectService, useClass: DataService }
      ]
    });
  });

  it('should create the component', async(() => {
    let fixture = TestBed.createComponent(ProjectsComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  describe('initialization', () => {
    it('gets all of the projects', () => {
      let fixture = TestBed.createComponent(ProjectsComponent);
      let app = fixture.debugElement.componentInstance;
      let dataService = fixture.debugElement.injector.get(ProjectService);

      spyOn(dataService, 'getAll').and.returnValue(Observable.empty());
      app.ngOnInit();
      expect(dataService.getAll).toHaveBeenCalledTimes(1);
    });

    it('assigns the fetched projects', () => {
      let fixture = TestBed.createComponent(ProjectsComponent);
      let app = fixture.debugElement.componentInstance;
      let dataService = fixture.debugElement.injector.get(ProjectService);

      spyOn(dataService, 'getAll').and.returnValue(Observable.of([{
        _id: '42',
        name: 'Deep Thought'
      }, {
        _id: '1138',
        name: 'Big Brother by Another Mother'
      }]));
      app.ngOnInit();
      expect(app.projects).toEqual([{
        _id: '42',
        name: 'Deep Thought'
      }, {
        _id: '1138',
        name: 'Big Brother by Another Mother'
      }]);
    });
  });
});
