import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetupRankMedicalsRoutingModule } from './setup-rank-medicals-routing.module';
import { AddSetupRankMedicalsComponent } from './add-setup-rank-medicals/add-setup-rank-medicals.component';


@NgModule({
  declarations: [
    AddSetupRankMedicalsComponent
  ],
  imports: [
    CommonModule,
    SetupRankMedicalsRoutingModule
  ]
})
export class SetupRankMedicalsModule { }
