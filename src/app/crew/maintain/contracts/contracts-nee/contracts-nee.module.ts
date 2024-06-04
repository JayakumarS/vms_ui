import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractsNEERoutingModule } from './contracts-nee-routing.module';
import { ListContractsNEEComponent } from './list-contracts-nee/list-contracts-nee.component';
import { AddContractsNEEComponent } from './add-contracts-nee/add-contracts-nee.component';


@NgModule({
  declarations: [
    ListContractsNEEComponent,
    AddContractsNEEComponent
  ],
  imports: [
    CommonModule,
    ContractsNEERoutingModule
  ]
})
export class ContractsNEEModule { }
