import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSetupRankMedicalsComponent } from './add-setup-rank-medicals/add-setup-rank-medicals.component';

const routes: Routes = [
  {
    path:"add-setupmedical",
    component:AddSetupRankMedicalsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRankMedicalsRoutingModule { }
