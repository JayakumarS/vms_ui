import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserMasterComponent } from './add-user-master/add-user-master.component';
import { ListUserMasterComponent } from './list-user-master/list-user-master.component';

const routes: Routes = [
  {
    path:"list-user-master",
    component:ListUserMasterComponent,
  },
  {
    path:"add-user-master/:id",
    component:AddUserMasterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserMasterRoutingModule { }
