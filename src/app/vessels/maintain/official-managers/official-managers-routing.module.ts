import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOfficialManagersComponent } from './add-official-managers/add-official-managers.component';
import { ListOfficialManagersComponent } from './list-official-managers/list-official-managers.component';
import { ViewOfficialManagersComponent } from './view-official-managers/view-official-managers.component';

const routes: Routes = [
  {
    path: 'add-official-managers/:id',
    component:AddOfficialManagersComponent
  },
  {
    path: 'list-official-managers',
    component:ListOfficialManagersComponent
  },
  {
    path:"view-official-managers/:id",
    component:ViewOfficialManagersComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficialManagersRoutingModule { }
