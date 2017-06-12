import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { AdministratorGuardService } from '../../core/administrator-guard/administrator-guard.service';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: ':id', canActivate: [AdministratorGuardService], component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
