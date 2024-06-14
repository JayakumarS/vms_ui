import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListVesselBudgetsComponent } from './list-vessel-budgets/list-vessel-budgets.component';

const routes: Routes = [
  {
    path:'list-vessel-budgets',
    component:ListVesselBudgetsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VesselBudgetsRoutingModule { }
