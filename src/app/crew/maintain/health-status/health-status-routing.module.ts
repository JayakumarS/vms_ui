import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListHealthStatusComponent } from './list-health-status/list-health-status.component';
import { AddHealthStatusComponent } from './add-health-status/add-health-status.component';
import { ViewHealthStatusComponent } from './view-health-status/view-health-status.component';

const routes: Routes = [

  {
    path:"list-health-status",
    component:ListHealthStatusComponent
  },
  {
    path:"add-health-status/:id",
    component:AddHealthStatusComponent
  },
  {
    path:"view-health-status/:id",
    component:ViewHealthStatusComponent
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HealthStatusRoutingModule { }
