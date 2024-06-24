import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRankShiftComponent } from './list-rank-shift/list-rank-shift.component';
import { AddDefineRanksComponent } from '../../define-preferences-for-qualif-of-officers/define-ranks/add-define-ranks/add-define-ranks.component';
import { AddRankShiftComponent } from './add-rank-shift/add-rank-shift.component';
import { ViewRankShiftComponent } from './view-rank-shift/view-rank-shift.component';

const routes: Routes = [
  {
    path: "list-define-rank-shift",
    component: ListRankShiftComponent,
  },
  {
    path: "add-define-rank-shift/:id",
    component: AddRankShiftComponent,
  },
  {
    path: "view-define-rank-shift/:id",
    component: ViewRankShiftComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RankShiftRoutingModule { }
