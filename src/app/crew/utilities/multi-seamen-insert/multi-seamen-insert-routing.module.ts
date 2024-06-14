import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMultiSeamenInsertComponent } from './add-multi-seamen-insert/add-multi-seamen-insert.component';

const routes: Routes = [


  {
    path: "add-multi-seamen-insert",
    component: AddMultiSeamenInsertComponent,
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MultiSeamenInsertRoutingModule { }
