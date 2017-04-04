/* tslint:disable:no-unused-variable */

import { Project } from './project';
import { Stage } from './stage';
import { TaskTimer } from './task-timer';

describe('Model: TaskTimer', () => {
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
      _currentTime: 73,
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
    expect(taskTimer._currentTime).toEqual(73);
    expect((taskTimer as any).bogus).toBeUndefined();
  });

  describe('elapsedTime', () => {
    it('is zero for new timer', () => {
      const taskTimer = new TaskTimer({
        timesheetRid: '42731138',
        workDate: new Date(2017, 1, 7)
      });
      expect(taskTimer.elapsedTime).toEqual(0);
    });

    it('returns milliseconds for inactive timer', () => {
      const taskTimer = new TaskTimer({
        timesheetRid: '42731138',
        workDate: new Date(2017, 1, 7),
        milliseconds: 11994885939
      });
      expect(taskTimer.elapsedTime).toEqual(11994885939);
    });

    describe('for an active timer', () => {
      it('returns milliseconds plus the difference between current time and the start time', () => {
        const taskTimer = new TaskTimer({
          timesheetRid: '42731138',
          workDate: new Date(2017, 1, 7),
          milliseconds: 11994885939,
          isActive: true,
          startTime: 1900043,
          _currentTime: 20987123
        });
        expect(taskTimer.elapsedTime).toEqual(12013973019);
      });

      it('returns just milliseconds if there is no _currentTime', () => {
        const taskTimer = new TaskTimer({
          timesheetRid: '42731138',
          workDate: new Date(2017, 1, 7),
          milliseconds: 11994885939,
          isActive: true,
          startTime: 1900043
        });
        expect(taskTimer.elapsedTime).toEqual(11994885939);
      });
    });
  });
});
