import * as moment from 'moment';
import { Project } from './project';
import { Stage } from './stage';

export class TaskTimer {
  _id: string;
  timesheetRid: string;
  workDate: string;
  stage: Stage;
  project: Project;
  milliseconds?: number;
  isActive?: boolean;
  startTime?: number;
  _currentTime?: number;

  constructor(obj?: any) {
    if (obj) {
      this._id = obj._id;
      this.timesheetRid = obj.timesheetRid;
      this.milliseconds = obj.milliseconds;
      this.isActive = obj.isActive;
      this.startTime = obj.startTime;
      this._currentTime = obj._currentTime;

      if (obj.workDate) {
        this.workDate = moment(obj.workDate).format('YYYY-MM-DD');
      }

      if (obj.stage) {
        this.stage = new Stage(obj.stage);
      }

      if (obj.project) {
        this.project = new Project(obj.project);
      }
    }
  }

  get elapsedTime(): number {
    return (this.milliseconds || 0) +
      (this.isActive ? (this._currentTime || this.startTime) - this.startTime : 0);
  }
}
