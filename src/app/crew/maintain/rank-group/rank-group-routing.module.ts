import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRankGroupComponent } from './list-rank-group/list-rank-group.component';
import { AddRankGroupComponent } from './add-rank-group/add-rank-group.component';
import { ViewVesselTypesComponent } from 'src/app/vessels/maintain/vessel-types/view-vessel-types/view-vessel-types.component';
import { ViewRankGroupComponent } from './view-rank-group/view-rank-group.component';

const routes: Routes = [

  {
    path:"list-Rank-Group",
    component:ListRankGroupComponent
  },
  {
    path:"add-Rank-Group/:id",
    component:AddRankGroupComponent
  },
  {
    path:"view-Rank-Group/:id",
    component:ViewRankGroupComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RankGroupRoutingModule { }
