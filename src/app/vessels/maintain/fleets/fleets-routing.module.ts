import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFleetsComponent } from './list-fleets/list-fleets.component';
import { AddFleetsComponent } from './add-fleets/add-fleets.component';
import { ViewFleetsComponent } from './view-fleets/view-fleets.component';

const routes: Routes = [
  {
    path:"list-fleets",
    component:ListFleetsComponent
  },
  {
    path:"add-fleets/:id",
    component:AddFleetsComponent
  },
  {
    path:"view-fleets/:id",
    component:ViewFleetsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetsRoutingModule { }
