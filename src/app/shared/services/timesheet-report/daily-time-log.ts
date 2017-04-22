import { TaskTimer } from '../../../data/models/task-timer';
import { TaskSummary } from './task-summary';

export class DailyTimeLog {
  taskTimers: Array<TaskTimer>;
  jiraTasks: Array<TaskSummary>;
  sbvbTasks: Array<TaskSummary>;
  milliseconds: number;

  constructor(public date: Date) {
    this.taskTimers = [];
    this.jiraTasks = [];
    this.sbvbTasks = [];
    this.milliseconds = 0;
  }
}
