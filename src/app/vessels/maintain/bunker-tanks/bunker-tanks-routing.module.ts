import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBunkerTanksComponent } from './add-bunker-tanks/add-bunker-tanks.component';
import { ListBunkerTanksComponent } from './list-bunker-tanks/list-bunker-tanks.component';
import { ViewBunkerTanksComponent } from './view-bunker-tanks/view-bunker-tanks.component';

const routes: Routes = [
  {
    path:"list-bunker-tanks",
    component:ListBunkerTanksComponent
  },
  {
    path:"add-bunker-tanks/:id",
    component:AddBunkerTanksComponent

  },
  {
    path:"view-bunker-tanks/:id",
    component:ViewBunkerTanksComponent

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BunkerTanksRoutingModule { }
