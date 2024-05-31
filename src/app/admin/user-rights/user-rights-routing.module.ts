import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserRightsListComponent} from './user-rights-list/user-rights-list.component';
const routes: Routes = [
  {
    path: "user-rights",
    component: UserRightsListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRightsRoutingModule { }
