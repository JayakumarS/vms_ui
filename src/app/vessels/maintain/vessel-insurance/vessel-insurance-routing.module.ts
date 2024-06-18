import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListVesselInsuranceComponent } from './list-vessel-insurance/list-vessel-insurance.component';
import { AddVesselInsuranceComponent } from './add-vessel-insurance/add-vessel-insurance.component';
import { ViewVesselInsuranceComponent } from './view-vessel-insurance/view-vessel-insurance.component';

const routes: Routes = [

  {
    path:"list-vessel-insurance",
    component:ListVesselInsuranceComponent
  },
  {
    path:"add-vessel-insurance/:id",
    component:AddVesselInsuranceComponent
  },
  {
    path:"view-vessel-insurance/:id",
    component:ViewVesselInsuranceComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VesselInsuranceRoutingModule { }
