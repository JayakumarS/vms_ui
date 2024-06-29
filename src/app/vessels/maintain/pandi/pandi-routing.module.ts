import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPandiComponent } from './list-pandi/list-pandi.component';
import { AddPandiComponent } from './add-pandi/add-pandi.component';
import { ViewPandiComponent } from './view-pandi/view-pandi.component';

const routes: Routes = [

  {
    path:"list-p-and-i",
    component:ListPandiComponent
  },
  {
    path:"add-p-and-i/:id",
    component:AddPandiComponent
  },
  {
    path:"view-p-and-i/:id",
    component:ViewPandiComponent
  },

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PandiRoutingModule { }
