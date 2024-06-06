import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCollectiveContractComponent } from './list-collective-contract/list-collective-contract.component';
import { AddCollectiveContractComponent } from './add-collective-contract/add-collective-contract.component';

const routes: Routes = [
  {
    path: "list-collective-contract",
    component: ListCollectiveContractComponent,
  },
  {
    path: "add-collective-contract/:id",
    component: AddCollectiveContractComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectiveContractRoutingModule { }
