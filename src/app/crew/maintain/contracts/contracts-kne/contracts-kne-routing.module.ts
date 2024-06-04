import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddContractsKNEComponent } from './add-contracts-kne/add-contracts-kne.component';
import { ListContractsKNEComponent } from './list-contracts-kne/list-contracts-kne.component';

const routes: Routes = [
  {
    path:'add-contracts-kne',
    component:AddContractsKNEComponent
  },
  {
    path:'list-contracts-kne',
    component:ListContractsKNEComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractsKNERoutingModule { }
