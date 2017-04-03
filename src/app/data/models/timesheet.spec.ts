/* tslint:disable:no-unused-variable */

import { Timesheet } from './timesheet';

describe('Timesheet', () => {
  it('can be constructed', () => {
    const timesheet = new Timesheet();
    expect(timesheet).toBeTruthy();
  });

  it('copies data when constructed from an object', () => {
    const timesheet = new Timesheet({
      _id: '42',
      endDate: '2017-03-31',
      userRid: '1138',
      bogus: 'you should not see me'
    });
    expect(timesheet._id).toEqual('42');
    expect(timesheet.endDate).toEqual('2017-03-31');
    expect(timesheet.userRid).toEqual('1138');
    expect((timesheet as any).bogus).toBeUndefined();
  });
});
