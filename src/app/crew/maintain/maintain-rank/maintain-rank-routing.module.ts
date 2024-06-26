import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMaintainRankComponent } from './list-maintain-rank/list-maintain-rank.component';
import { AddMaintainRankComponent } from './add-maintain-rank/add-maintain-rank.component';
import { ViewMaintainRankComponent } from './view-maintain-rank/view-maintain-rank.component';

const routes: Routes = [
  {
    path:"list-maintain-rank",
    component:ListMaintainRankComponent
  },
  {
    path:"add-maintain-rank/:id",
    component:AddMaintainRankComponent
  },
  {
    path:"view-maintain-rank/:id",
    component:ViewMaintainRankComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintainRankRoutingModule { }
