import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserAdministrationComponent } from './user-administration.component';

const routes: Routes = [
  { path: '', component: UserAdministrationComponent },
  { path: 'change-password', loadChildren: './+change-password/change-password.module#ChangePasswordModule' },
  { path: 'my-profile', loadChildren: './+my-profile/my-profile.module#MyProfileModule' },
  { path: 'user-list', loadChildren: './+user-list/user-list.module#UserListModule' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAdministrationtRoutingModule { }
