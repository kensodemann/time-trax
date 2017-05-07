import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // { path: '', component: UserAdministrationComponent }
  { path: 'change-password', loadChildren: './+change-password/change-password.module#ChangePasswordModule' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAdministrationtRoutingModule { }
