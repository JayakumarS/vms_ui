import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSetupRankCertificatesComponent } from '../setup-rank-certificates/add-setup-rank-certificates/add-setup-rank-certificates.component';
import { AddSetupRankTrainingsComponent } from './add-setup-rank-trainings/add-setup-rank-trainings.component';

const routes: Routes = [

  {
    path:"add-setuptraining",
    component:AddSetupRankTrainingsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRankTrainingsRoutingModule { }
