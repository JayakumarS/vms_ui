import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListVesselTypesComponent } from './list-vessel-types/list-vessel-types.component';
import { AddVesselTypesComponent } from './add-vessel-types/add-vessel-types.component';
import { ViewVesselTypesComponent } from './view-vessel-types/view-vessel-types.component';

const routes: Routes = [

  {
    path:"list-vessel-types",
    component:ListVesselTypesComponent
  },
  {
    path:"add-vessel-types/:id",
    component:AddVesselTypesComponent
  },
  {
    path:"view-vessel-types/:id",
    component:ViewVesselTypesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VesselTypesRoutingModule { }
