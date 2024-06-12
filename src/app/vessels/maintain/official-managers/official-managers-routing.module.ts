import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOfficialManagersComponent } from './add-official-managers/add-official-managers.component';
import { ListOfficialManagersComponent } from './list-official-managers/list-official-managers.component';

const routes: Routes = [
  {
    path: 'add-official-managers/:0',
    component:AddOfficialManagersComponent
  },
  {
    path: 'list-official-managers',
    component:ListOfficialManagersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficialManagersRoutingModule { }
