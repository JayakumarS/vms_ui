import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrewPayrollCurrencyComponent } from './crew-payroll-currency/crew-payroll-currency.component';

const routes: Routes = [
  {
    path: 'crew-payroll-currency',
    component: CrewPayrollCurrencyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrewPayrollCurrencyRoutingModule { }
