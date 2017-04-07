import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'trx-ask-dialog',
  templateUrl: './ask-dialog.component.html',
  styleUrls: ['./ask-dialog.component.scss']
})
export class AskDialogComponent implements OnInit {
  message: string;
  title: string;

  constructor(public dialog: MdDialogRef<AskDialogComponent>) { }

  ngOnInit() {
  }

}
