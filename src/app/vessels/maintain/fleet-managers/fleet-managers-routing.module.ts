import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFleetManagersComponent } from './add-fleet-managers/add-fleet-managers.component';
import { ListFleetManagersComponent } from './list-fleet-managers/list-fleet-managers.component';

const routes: Routes = [
  {
    path:'add-fleet-managers/:0',
    component:AddFleetManagersComponent
  },
  {
    path:'list-fleet-managers',
    component:ListFleetManagersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetManagersRoutingModule { }
