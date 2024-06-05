import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSolidarityTaxContractsComponent } from './add-solidarity-tax-contracts/add-solidarity-tax-contracts.component';
import { ListSolidarityTaxContractsComponent } from './list-solidarity-tax-contracts/list-solidarity-tax-contracts.component';

const routes: Routes = [
  {
    path: "list-solidarity-tax-contracts",
    component: ListSolidarityTaxContractsComponent,
  },
  {
    path: "add-solidarity-tax-contracts/:id",
    component: AddSolidarityTaxContractsComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolidarityTaxContractsRoutingModule { }
