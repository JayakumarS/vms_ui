import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDefineCrewEvaluationCriteriaComponent } from './add-define-crew-evaluation-criteria/add-define-crew-evaluation-criteria.component';
import { ListDefineCrewEvaluationCriteriaComponent } from './list-define-crew-evaluation-criteria/list-define-crew-evaluation-criteria.component';

const routes: Routes = [
  {
    path: "list-define-crew-evaluation-criteria",
    component: ListDefineCrewEvaluationCriteriaComponent,
  },
  {
    path: "add-define-crew-evaluation-criteria/:id",
    component: AddDefineCrewEvaluationCriteriaComponent,
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefineCrewEvaluationCriteriaRoutingModule { }
