import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDefinePairedRankComponent } from './list-define-paired-rank/list-define-paired-rank.component';
import { AddDefinePairedRankComponent } from './add-define-paired-rank/add-define-paired-rank.component';

const routes: Routes = [
  
  {
    path: "list-Define-Paired-Rank",
    component: ListDefinePairedRankComponent,
  },
  {
    path: "add-Define-Paired-Rank/:id",
    component: AddDefinePairedRankComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefinePairedRankRoutingModule { }
