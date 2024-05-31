import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLogListComponent } from './user-log-list/user-log-list.component';

const routes: Routes = [
  {
    path: "list-user-log",
    component: UserLogListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserLogRoutingModule { }
