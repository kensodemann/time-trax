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

  constructor(timesheetId: string, workDate: any) {
    this.timesheetRid = timesheetId;
    this.workDate = moment(workDate).format('YYYY-MM-DD');
  }
}
