import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDepartmentBudgetsComponent } from './list-department-budgets/list-department-budgets.component';
import { AddDepartmentBudgetsComponent } from './add-department-budgets/add-department-budgets.component';

const routes: Routes = [
  {
    path:'list-department-budgets',
    component: ListDepartmentBudgetsComponent
  },
  {
    path: 'add-department-budgets/:id',
    component: AddDepartmentBudgetsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentBudgetsRoutingModule { }
