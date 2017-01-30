import { TaskTimer } from '../../../data/models/task-timer';

export class DailyTimeLog {
  taskTimers: Array<TaskTimer>;

  constructor(public date: Date) {
    this.taskTimers = [];
  }
}
