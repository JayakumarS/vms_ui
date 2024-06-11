import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListVesselCommunicationLocationsComponent } from './list-vessel-communication-locations/list-vessel-communication-locations.component';
import { AddVesselCommunicationLocationsComponent } from './add-vessel-communication-locations/add-vessel-communication-locations.component';

const routes: Routes = [
  {
    path:"list-vessel-communication-locations",
    component:ListVesselCommunicationLocationsComponent 
  },
  {
    path:"add-vessel-communication-locations/:id",
    component:AddVesselCommunicationLocationsComponent 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VesselCommunicationLocationsRoutingModule { }
