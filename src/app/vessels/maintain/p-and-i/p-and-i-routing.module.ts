import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPAndIComponent } from './list-p-and-i/list-p-and-i.component';
import { AddPAndIComponent } from './add-p-and-i/add-p-and-i.component';

const routes: Routes = [
  {
    path:"list-p-and-i",
    component:ListPAndIComponent
  },
  {
    path:"add-p-and-i/:id",
    component:AddPAndIComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PAndIRoutingModule { }
