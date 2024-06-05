import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeamansContractComponent } from './seamans-contract/seamans-contract.component';

const routes: Routes = [
  {
    path:"seamans-contracts",
    component:SeamansContractComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeamansContractRoutingModule { }
