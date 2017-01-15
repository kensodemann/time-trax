/* tslint:disable:no-unused-variable */

import { DateService } from './date.service';

import * as moment from 'moment';

describe('DateService', () => {
  let service;
  beforeEach(() => {
    service = new DateService();
  });

  it('exists', () => {
    expect(service).toBeTruthy();
  });

  describe('week end date', () => {
    it('returns today if today is Saturday', () => {
      const x = service.weekEndDate('2016-12-17');
      expect(x).toEqual('2016-12-17');
    });

    it('returns Saturday of the week the specified date falls in', () => {
      const x = service.weekEndDate('2016-12-14');
      expect(x).toEqual('2016-12-17');
    });

    it('returns next Saturday if today is sunday', () => {
      const x = service.weekEndDate('2016-12-18');
      expect(x).toEqual('2016-12-24');
    });

    it('handles moment inputs', () => {
      const m = moment('2016-10-12');
      const x = service.weekEndDate(m);
      expect(x).toEqual('2016-10-15');
    });

    it('handles date inputs', () => {
      const dt = new Date('2016-10-12');
      const x = service.weekEndDate(dt);
      expect(x).toEqual('2016-10-15');
    });
  });
});
