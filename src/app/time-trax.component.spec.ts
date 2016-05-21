import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { TimeTraxAppComponent } from '../app/time-trax.component';

beforeEachProviders(() => [TimeTraxAppComponent]);

describe('App: TimeTrax', () => {
  it('should create the app',
      inject([TimeTraxAppComponent], (app: TimeTraxAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'time-trax works!\'',
      inject([TimeTraxAppComponent], (app: TimeTraxAppComponent) => {
    expect(app.title).toEqual('time-trax works!');
  }));
});
