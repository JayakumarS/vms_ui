import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrewPayrollCurrencyComponent } from './crew-payroll-currency/crew-payroll-currency.component';
import { ListCrewPayrollCurrencyComponent } from './list-crew-payroll-currency/list-crew-payroll-currency.component';

const routes: Routes = [
  {
    path: "crew-payroll-currency/:id",
    component: CrewPayrollCurrencyComponent
  },
  {
    path: "list-crew-payroll-currency",
    component: ListCrewPayrollCurrencyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrewPayrollCurrencyRoutingModule { }
