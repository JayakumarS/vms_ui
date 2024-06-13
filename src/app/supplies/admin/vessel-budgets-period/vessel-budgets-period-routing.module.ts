import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListVesselBudgetsPeriodComponent } from './list-vessel-budgets-period/list-vessel-budgets-period.component';
import { AddVesselBudgetsPeriodComponent } from './add-vessel-budgets-period/add-vessel-budgets-period.component';

const routes: Routes = [
  {
    path:'list-vessel-budgets-period',
    component: ListVesselBudgetsPeriodComponent  
  },
  {
    path:'add-vessel-budgets-period/:id',
    component: AddVesselBudgetsPeriodComponent  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VesselBudgetsPeriodRoutingModule { }
