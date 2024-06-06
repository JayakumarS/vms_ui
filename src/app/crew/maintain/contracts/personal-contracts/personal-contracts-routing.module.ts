import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPersonalContractsComponent } from './add-personal-contracts/add-personal-contracts.component';
import { ListPersonalContractsComponent } from './list-personal-contracts/list-personal-contracts.component';

const routes: Routes = [
  {
    path: "list-personal-contracts",
    component: ListPersonalContractsComponent
  },
  {
    path: "add-personal-contracts/:id",
    component: AddPersonalContractsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalContractsRoutingModule { }
