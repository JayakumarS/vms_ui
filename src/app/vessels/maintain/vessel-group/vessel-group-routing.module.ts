import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVesselGroupComponent } from './add-vessel-group/add-vessel-group.component';
import { ListVesselGroupComponent } from './list-vessel-group/list-vessel-group.component';

const routes: Routes = [
  
  {
    path:"list-vessel-group",
    component:ListVesselGroupComponent
  },
  {
    path:"add-vessel-group/:id",
    component:AddVesselGroupComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VesselGroupRoutingModule { }
