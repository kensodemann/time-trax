/* tslint:disable:no-unused-variable */

import { Project } from './project';
import { Stage } from './stage';
import { TaskTimer } from './task-timer';

describe('TaskTimer', () => {
  it('can be constructed', () => {
    const taskTimer = new TaskTimer();
    expect(taskTimer).toBeTruthy();
  });

  it('sets the work date and timesheet ref ID', () => {
    const workDate = new Date(2017, 1, 7);
    const taskTimer = new TaskTimer({
      timesheetRid: '42731138',
      workDate: workDate
    });
    expect(taskTimer.timesheetRid).toEqual('42731138');
    expect(taskTimer.workDate).toEqual('2017-02-07');
  });

  it('sets the work date properly from an ISO string', () => {
    const taskTimer = new TaskTimer({
      timesheetRid: '42731138',
      workDate: '2017-03-20T00:00:00.0000'
    });
    expect(taskTimer.workDate).toEqual('2017-03-20');
  });

  it('initialized the full object', () => {
    const taskTimer = new TaskTimer({
      _id: '1138314159',
      timesheetRid: '42731138',
      workDate: '2017-03-20T00:00:00.0000',
      project: {
        _id: '111999',
        name: 'Bobby',
        sbvbTaskId: 'PL0209958',
        status: 'active'
      },
      stage: {
        _id: '4273',
        stageNumber: 4,
        name: 'Coding'
      },
      milliseconds: 2000,
      isActive: false,
      startTime: 42,
      bogus: 'I should not be seen'
    });
    expect(taskTimer._id).toEqual('1138314159');
    expect(taskTimer.timesheetRid).toEqual('42731138');
    expect(taskTimer.workDate).toEqual('2017-03-20');
    expect(taskTimer.project).toEqual(new Project({
      _id: '111999',
      name: 'Bobby',
      sbvbTaskId: 'PL0209958',
      status: 'active'
    }));
    expect(taskTimer.milliseconds).toEqual(2000);
    expect(taskTimer.isActive).toEqual(false);
    expect(taskTimer.startTime).toEqual(42);
    expect((taskTimer as any).bogus).toBeUndefined();
  });
});
