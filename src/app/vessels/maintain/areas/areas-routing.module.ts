import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAreasComponent } from './list-areas/list-areas.component';
import { AddAreasComponent } from './add-areas/add-areas.component';

const routes: Routes = [
  {
    path:"list-areas",
    component:ListAreasComponent
  },
  {
    path:"add-areas/:id",
    component:AddAreasComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreasRoutingModule { }
