import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDefineRanksComponent } from './list-define-ranks/list-define-ranks.component';
import { AddDefineRanksComponent } from './add-define-ranks/add-define-ranks.component';

const routes: Routes = [

  {
    path: "list-Define-rank",
    component: ListDefineRanksComponent,
  },
  {
    path: "add-Define-rank/:id",
    component: AddDefineRanksComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefineRanksRoutingModule { }
