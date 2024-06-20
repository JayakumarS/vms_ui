import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListVesselOwnerComponent } from './list-vessel-owner/list-vessel-owner.component';
import { AddVesselOwnerComponent } from './add-vessel-owner/add-vessel-owner.component';
import { ViewVesselOwnerComponent } from './view-vessel-owner/view-vessel-owner.component';

const routes: Routes = [

  {
    path:"list-vessel-owner",
    component:ListVesselOwnerComponent
  },
  {
    path:"add-vessel-owner/:id",
    component:AddVesselOwnerComponent
  },
  {
    path:"view-vessel-owner/:id",
    component:ViewVesselOwnerComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VesselOwnerRoutingModule { }
