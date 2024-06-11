import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBunkerTanksComponent } from './list-bunker-tanks/list-bunker-tanks.component';
import { AddBunkerTanksComponent } from './add-bunker-tanks/add-bunker-tanks.component';

const routes: Routes = [
  {
    path:"list-bunker-tanks",
    component:ListBunkerTanksComponent
  },
  {
    path:"add-bunker-tanks/:id",
    component:AddBunkerTanksComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreasRoutingModule { }
