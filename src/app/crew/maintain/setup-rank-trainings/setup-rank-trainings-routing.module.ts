import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSetupRankCertificatesComponent } from '../setup-rank-certificates/add-setup-rank-certificates/add-setup-rank-certificates.component';

const routes: Routes = [

  {
    path:"add-setuptraining",
    component:AddSetupRankCertificatesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRankTrainingsRoutingModule { }
