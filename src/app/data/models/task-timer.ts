import { Project } from './project';
import { Stage } from './stage';

export interface TaskTimer {
  _id: string;
  timesheetRid: string;
  workDate: string;
  stage: Stage;
  project: Project;
  milliseconds?: number;
  isActive?: boolean;
  startTime?: number;
}
