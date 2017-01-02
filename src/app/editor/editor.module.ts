import { NgModule } from '@angular/core';

import { ProjectEditorModule } from './project-editor/project-editor.module';

@NgModule({
  exports: [ProjectEditorModule]
})
export class EditorModule { }
