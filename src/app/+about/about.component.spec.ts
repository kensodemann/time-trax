import { TestBed, async } from '@angular/core/testing';
import { ViewContainerRef } from '@angular/core';
import { Response, ResponseOptions } from '@angular/http';
import { MdIconModule } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import * as moment from 'moment';

import { ErrorMessageService } from '../shared/services/error-message/error-message.service';
import { Version } from '../data/models/version';
import { VersionService } from '../data/services/version/version.service';
import { AboutComponent } from './about.component';

class VersionServiceStub {
  get(): Observable<Version> { return Observable.of(null); }
}

class ErrorMessageStub {
  show(res: Response, viewContainerRef: ViewContainerRef): Observable<any> {
    return Observable.empty();
  }
}

describe('AboutComponent', () => {
  let app;
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AboutComponent
      ],
      imports: [
        MdIconModule
      ],
      providers: [
        { provide: ErrorMessageService, useClass: ErrorMessageStub },
        { provide: VersionService, useClass: VersionServiceStub }
      ]
    });

    fixture = TestBed.createComponent(AboutComponent);
    app = fixture.debugElement.componentInstance;
  });

  it('builds', async(() => {
    expect(app).toBeTruthy();
  }));

  describe('on initialization', () => {
    it('gets the version information', () => {
      const versionServiceStub = fixture.debugElement.injector.get(VersionService);

      spyOn(versionServiceStub, 'get').and.returnValue(Observable.of({}));
      app.ngOnInit();
      expect(versionServiceStub.get).toHaveBeenCalledTimes(1);
    });

    it('assigns the returned information for binding', () => {
      const versionServiceStub = fixture.debugElement.injector.get(VersionService);

      spyOn(versionServiceStub, 'get').and.returnValue(Observable.of({
        client: 'Critical Ability (3.1.4)',
        server: 'Luna (4.2.0)',
        releaseDate: moment('2016-12-30')
      }));
      app.ngOnInit();
      expect(app.version).toEqual({
        client: 'Critical Ability (3.1.4)',
        server: 'Luna (4.2.0)',
        releaseDate: moment('2016-12-30')
      });
    });

    it('shows an error if there is one', () => {
      const versionServiceStub = fixture.debugElement.injector.get(VersionService);
      const errorMessage = fixture.debugElement.injector.get(ErrorMessageService);

      const opt = new ResponseOptions({
        status: 400,
        statusText: 'Not OK',
        body: {}
      });
      const res = new Response(opt);

      spyOn(versionServiceStub, 'get').and.returnValue(Observable.throw(res));
      spyOn(errorMessage, 'show');

      app.ngOnInit();
      expect(errorMessage.show).toHaveBeenCalledTimes(1);
    });
  });
});
