import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFleetManagersComponent } from './add-fleet-managers/add-fleet-managers.component';
import { ListFleetManagersComponent } from './list-fleet-managers/list-fleet-managers.component';
import { ViewFleetManagersComponent } from './add-fleet-managers/view-fleet-managers/view-fleet-managers.component';

const routes: Routes = [
  {
    path:'add-fleet-managers/:id',
    component:AddFleetManagersComponent
  },
  {
    path:'list-fleet-managers',
    component:ListFleetManagersComponent
  },
  {
    path:'view-fleet-managers/:id',
    component:ViewFleetManagersComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetManagersRoutingModule { }
