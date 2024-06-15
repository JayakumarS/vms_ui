import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCompanyEmployeesComponent } from './add-company-employees/add-company-employees.component';
import { ListCompanyEmployeesComponent } from './list-company-employees/list-company-employees.component';

const routes: Routes = [

  {
    path: "list-company-employees",
    component: ListCompanyEmployeesComponent,
  },
  {
    path: "add-company-employees/:id",
    component: AddCompanyEmployeesComponent,
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyEmployeesRoutingModule { }
