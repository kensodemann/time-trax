import { Injectable, ViewContainerRef } from '@angular/core';
import { MdDialog, MdDialogConfig } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { Project } from '../../data/models/project';
import { ProjectEditorComponent } from './project-editor.component';

@Injectable()
export class ProjectEditorService {

  constructor(private dialog: MdDialog) { }

  open(project: Project, viewContainerRef: ViewContainerRef): Observable<any> {
    const config = new MdDialogConfig();
    config.viewContainerRef = viewContainerRef;
    config.disableClose = true;

    const dialog = this.dialog.open(ProjectEditorComponent, config);

    dialog.componentInstance.initialize(project);

    return dialog.afterClosed();
  }

}
