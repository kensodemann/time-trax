import { Component, OnInit, ViewContainerRef } from '@angular/core';

import { MessageDialogService } from '../shared/message-dialog/message-dialog.service';

@Component({
  selector: 'app-time-report',
  templateUrl: './time-report.component.html',
  styleUrls: ['./time-report.component.scss']
})
export class TimeReportComponent implements OnInit {

  constructor(private viewContainerRef: ViewContainerRef, private messageDialog: MessageDialogService) { }

  ngOnInit() { }

  showDialog() {
    this.messageDialog.error('Error',
      // 'This is how it will look with a short message',
      'I really really hope this works. This is a long message. Longer than most will probablby be. I just want to see' +
      ' what happens when there is really long crap like this. Hopefully this will wrap and scroll and whatnot. I am also' +
      ' thinking of making the title something that cannot be specified. I do not really see a need for that.',
      this.viewContainerRef);
  }

}
