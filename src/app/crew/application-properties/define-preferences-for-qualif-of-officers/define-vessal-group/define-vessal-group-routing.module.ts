import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDefineVessalGroupComponent } from './list-define-vessal-group/list-define-vessal-group.component';
import { AddDefineVessalGroupComponent } from './add-define-vessal-group/add-define-vessal-group.component';

const routes: Routes = [

  
  {
    path: "list-Define-vessalGroup",
    component: ListDefineVessalGroupComponent,
  },
  {
    path: "add-Define-vessalGroup/:id",
    component: AddDefineVessalGroupComponent,
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefineVessalGroupRoutingModule { }
