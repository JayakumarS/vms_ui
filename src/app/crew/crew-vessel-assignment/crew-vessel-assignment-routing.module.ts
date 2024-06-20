import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCrewVesselAssignmentComponent } from './add-crew-vessel-assignment/add-crew-vessel-assignment.component';

const routes: Routes = [
  {
    path: 'add-crew-vessel-assignment',
    component: AddCrewVesselAssignmentComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrewVesselAssignmentRoutingModule { }
