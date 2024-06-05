import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCompanyDepartmentComponent } from './add-company-department/add-company-department.component';
import { ListCompanyDepartmentComponent } from './list-company-department/list-company-department.component';

const routes: Routes = [
  {
    path: 'add-company-department/:0',
    component: AddCompanyDepartmentComponent
  },
  {
    path: 'list-company-department',
    component: ListCompanyDepartmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyDepartmentRoutingModule { }
