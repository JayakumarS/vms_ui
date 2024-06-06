import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOfficeEvaluationsComponent } from './list-office-evaluations/list-office-evaluations.component';
import { AddOfficeEvaluationsComponent } from './add-office-evaluations/add-office-evaluations.component';

const routes: Routes = [
  {
    path: "list-officeevaluation",
    component: ListOfficeEvaluationsComponent,
  },
  {
    path: "add-officeevaluation/:id",
    component: AddOfficeEvaluationsComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfficeEvaluationsRoutingModule { }
