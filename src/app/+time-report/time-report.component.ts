import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { AskDialogService } from '../shared/services/ask-dialog/ask-dialog.service';
import { ErrorDialogService } from '../shared/services/error-dialog/error-dialog.service';

@Component({
  selector: 'trx-time-report',
  templateUrl: './time-report.component.html',
  styleUrls: ['./time-report.component.scss']
})
export class TimeReportComponent implements OnInit {

  constructor(private viewContainerRef: ViewContainerRef, private askDialog: AskDialogService, private errorDialog: ErrorDialogService) { }

  ngOnInit() { }

  showAskDialog() {
    this.askDialog.open('Deep Thought',
      'Do you know the average airspeed velocity of an unlaiden swallow?',
      this.viewContainerRef).subscribe(res => console.log(res));
  }

  showErrorDialog() {
    this.errorDialog.open('Error',
      // 'This is how it will look with a short message',
      'I really really hope this works. This is a long message. Longer than most will probablby be. I just want to see' +
      ' what happens when there is really long crap like this. Hopefully this will wrap and scroll and whatnot. I am also' +
      ' thinking of making the title something that cannot be specified. I do not really see a need for that.',
      this.viewContainerRef);
  }

}
