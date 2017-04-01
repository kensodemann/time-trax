/* tslint:disable:no-unused-variable */

import { TaskTimer } from './task-timer';

describe('TaskTimer', () => {
  it('can be constructed', () => {
    const taskTimer = new TaskTimer('42731138', new Date());
    expect(taskTimer).toBeTruthy();
  });

  it('sets the work date and timesheet ref ID', () => {
    const workDate = new Date(2017, 1, 7);
    const taskTimer = new TaskTimer('42731138', workDate);
    expect(taskTimer.timesheetRid).toEqual('42731138');
    expect(taskTimer.workDate).toEqual('2017-02-07');
  });

  it('sets the work date properly from an ISO string', () => {
    const taskTimer = new TaskTimer('42731138', '2017-03-20T00:00:00.0000');
    expect(taskTimer.workDate).toEqual('2017-03-20');
  });
});
