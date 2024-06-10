import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListVesselPortArrivalComponent } from './list-vessel-port-arrival/list-vessel-port-arrival.component';
import { AddVesselPortArrivalComponent } from './add-vessel-port-arrival/add-vessel-port-arrival.component';

const routes: Routes = [
  {
    path:'list-vessel-port',
    component: ListVesselPortArrivalComponent
  },
  {
    path:'add-vessel-port/:id',
    component: AddVesselPortArrivalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VesselPortArrivalRoutingModule { }
