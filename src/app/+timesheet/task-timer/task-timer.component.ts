import { Component, Input, OnInit } from '@angular/core';

import { TaskTimer } from '../../data/models/task-timer';

@Component({
  selector: 'trx-task-timer',
  templateUrl: './task-timer.component.html',
  styleUrls: ['./task-timer.component.scss']
})
export class TaskTimerComponent implements OnInit {
  @Input() timeLog: TaskTimer;

  constructor() { }

  ngOnInit() {
  }

}
