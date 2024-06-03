import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectiveContractRoutingModule } from './collective-contract-routing.module';
import { ListCollectiveContractComponent } from './list-collective-contract/list-collective-contract.component';
import { AddCollectiveContractComponent } from './add-collective-contract/add-collective-contract.component';


@NgModule({
  declarations: [
    ListCollectiveContractComponent,
    AddCollectiveContractComponent
  ],
  imports: [
    CommonModule,
    CollectiveContractRoutingModule
  ]
})
export class CollectiveContractModule { }
