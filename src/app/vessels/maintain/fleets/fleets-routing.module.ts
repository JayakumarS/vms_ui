import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFleetsComponent } from './list-fleets/list-fleets.component';
import { AddFleetsComponent } from './add-fleets/add-fleets.component';

const routes: Routes = [
  {
    path:"list-fleets",
    component:ListFleetsComponent
  },
  {
    path:"add-fleets",
    component:AddFleetsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetsRoutingModule { }
