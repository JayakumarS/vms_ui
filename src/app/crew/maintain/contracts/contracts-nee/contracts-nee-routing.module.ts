import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContractsNEEComponent } from './add-contracts-nee/add-contracts-nee.component';
import { ListContractsNEEComponent } from './list-contracts-nee/list-contracts-nee.component';

const routes: Routes = [
  {
    path:'add-contracts-nee/:0',
    component:AddContractsNEEComponent
  },
  {
    path:'list-contracts-nee',
    component:ListContractsNEEComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractsNEERoutingModule { }
