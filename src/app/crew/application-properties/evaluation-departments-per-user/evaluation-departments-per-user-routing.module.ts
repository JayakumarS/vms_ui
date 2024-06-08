import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEvaluationDepartmentsPerUserComponent } from './add-evaluation-departments-per-user/add-evaluation-departments-per-user.component';
import { ListEvaluationDepartmentsPerUserComponent } from './list-evaluation-departments-per-user/list-evaluation-departments-per-user.component';

const routes: Routes = [

  {
    path: "list-evaluation-departments-per-user",
    component: ListEvaluationDepartmentsPerUserComponent,
  },
  {
    path: "add-evaluation-departments-per-user/:id",
    component: AddEvaluationDepartmentsPerUserComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationDepartmentsPerUserRoutingModule { }
