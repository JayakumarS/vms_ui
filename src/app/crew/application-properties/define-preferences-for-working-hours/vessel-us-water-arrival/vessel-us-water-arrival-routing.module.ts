import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListVesselUsWaterArrivalComponent } from './list-vessel-us-water-arrival/list-vessel-us-water-arrival.component';
import { AddVesselUsWaterArrivalComponent } from './add-vessel-us-water-arrival/add-vessel-us-water-arrival.component';

const routes: Routes = [
  {
    path:'list-vessel-us-water',
    component: ListVesselUsWaterArrivalComponent
  },
  {
    path:'add-vessel-us-water/:id',
    component: AddVesselUsWaterArrivalComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VesselUsWaterArrivalRoutingModule { }
