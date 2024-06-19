import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSetupRankCertificatesComponent } from './add-setup-rank-certificates/add-setup-rank-certificates.component';

const routes: Routes = [

  {
    path:"add-setuprank",
    component:AddSetupRankCertificatesComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRankCertificatesRoutingModule { }
