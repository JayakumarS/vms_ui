import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDefineEvaluationLegendsComponent } from './add-define-evaluation-legends/add-define-evaluation-legends.component';
import { ListDefineEvaluationLegendsComponent } from './list-define-evaluation-legends/list-define-evaluation-legends.component';

const routes: Routes = [

  {
    path: "list-define-crew-evaluation-legends",
    component: ListDefineEvaluationLegendsComponent,
  },
  {
    path: "add-define-crew-evaluation-legends/:id",
    component: AddDefineEvaluationLegendsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefineEvaluationLegendsRoutingModule { }
