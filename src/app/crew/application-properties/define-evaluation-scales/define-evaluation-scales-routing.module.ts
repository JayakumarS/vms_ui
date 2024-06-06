import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDefineEvaluationScalesComponent } from './add-define-evaluation-scales/add-define-evaluation-scales.component';
import { ListDefineEvaluationScalesComponent } from './list-define-evaluation-scales/list-define-evaluation-scales.component';

const routes: Routes = [

  {
    path: "list-define-crew-evaluation-scales",
    component: ListDefineEvaluationScalesComponent,
  },
  {
    path: "add-define-crew-evaluation-scales/:id",
    component: AddDefineEvaluationScalesComponent,
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefineEvaluationScalesRoutingModule { }
