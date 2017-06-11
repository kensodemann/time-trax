import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserListComponent } from './user-list.component';
import { AdministratorGuardService } from '../../core/administrator-guard/administrator-guard.service';

const routes: Routes = [
  { path: '', component: UserListComponent, canActivate: [AdministratorGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserListRoutingModule { }
