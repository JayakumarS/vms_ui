import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListClassComponent } from './list-class/list-class.component';
import { AddClassComponent } from './add-class/add-class.component';
import { ViewClassComponent } from './view-class/view-class.component';

const routes: Routes = [

  {
    path:"list-class",
    component:ListClassComponent
  },
  {
    path:"add-class/:id",
    component:AddClassComponent
  },
  {
    path:"view-class/:id",
    component:ViewClassComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassRoutingModule { }
