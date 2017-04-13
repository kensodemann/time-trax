import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { TaskTimer } from '../../../data/models/task-timer';

@Component({
  selector: 'trx-task-timer',
  templateUrl: './task-timer.component.html',
  styleUrls: ['./task-timer.component.scss']
})
export class TaskTimerComponent implements OnInit {
  @Input() timeLog: TaskTimer;
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() toggle: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() { }
}
