import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDespatchReasonsComponent } from './add-despatch-reasons/add-despatch-reasons.component';
import { ListDespatchReasonsComponent } from './list-despatch-reasons/list-despatch-reasons.component';

const routes: Routes = [
  {
    path: "list-despatch-reasons",
    component: ListDespatchReasonsComponent,
  },
  {
    path: "add-despatch-reasons/:id",
    component: AddDespatchReasonsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DespatchReasonsRoutingModule { }
