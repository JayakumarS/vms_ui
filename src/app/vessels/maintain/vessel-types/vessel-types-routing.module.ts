import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListVesselTypesComponent } from './list-vessel-types/list-vessel-types.component';
import { AddVesselTypesComponent } from './add-vessel-types/add-vessel-types.component';

const routes: Routes = [

  {
    path:"list-vessel-types",
    component:ListVesselTypesComponent
  },
  {
    path:"add-vessel-types/:id",
    component:AddVesselTypesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VesselTypesRoutingModule { }
