import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFdAndDComponent } from './list-fd-and-d/list-fd-and-d.component';
import { AddFdAndDComponent } from './add-fd-and-d/add-fd-and-d.component';

const routes: Routes = [

  {
    path:"list-fd-and-f",
    component:ListFdAndDComponent
  },
  {
    path:"add-fd-and-d/:id",
    component:AddFdAndDComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FdAndDRoutingModule { }
