/* tslint:disable:no-unused-variable */

import { DateService } from './date.service';

import * as moment from 'moment';

describe('ProjectService', () => {
  let service;
  beforeEach(() => {
    service = new DateService();
  });

  it('exists', () => {
    expect(service).toBeTruthy();
  });

  describe('week end date', () => {
    it('returns today if today is Saturday', () => {
      let x = service.weekEndDate('2016-12-17');
      expect(x).toEqual('2016-12-17');
    });

    it('returns Saturday of the week the specified date falls in', () => {
      let x = service.weekEndDate('2016-12-14');
      expect(x).toEqual('2016-12-17');
    });

    it('returns next Saturday if today is sunday', () => {
      let x = service.weekEndDate('2016-12-18');
      expect(x).toEqual('2016-12-24');
    });

    it('handles moment inputs', () => {
      let m = moment('2016-10-12');
      let x = service.weekEndDate(m);
      expect(x).toEqual('2016-10-15');
    });

    it('handles date inputs', () => {
      let dt = new Date('2016-10-12');
      let x = service.weekEndDate(dt);
      expect(x).toEqual('2016-10-15');
    });
  });
});
