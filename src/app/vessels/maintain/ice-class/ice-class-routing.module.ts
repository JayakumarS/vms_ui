import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListIceClassComponent } from './list-ice-class/list-ice-class.component';
import { AddIceClassComponent } from './add-ice-class/add-ice-class.component';
import { ViewIceClassComponent } from './view-ice-class/view-ice-class.component';

const routes: Routes = [
  {
    path:'list-ice-class',
    component:ListIceClassComponent
  },
  {
    path:'add-ice-class/:id',
    component:AddIceClassComponent
  },
  {
    path:'view-ice-class/:id',
  component:ViewIceClassComponent
 }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IceClassRoutingModule { }
