import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMultiSeamenInsertComponent } from './list-multi-seamen-insert/list-multi-seamen-insert.component';
import { AddMultiSeamenInsertComponent } from './add-multi-seamen-insert/add-multi-seamen-insert.component';

const routes: Routes = [

  {
    path: "list-multi-seamen-insert",
    component: ListMultiSeamenInsertComponent,
  },
  {
    path: "add-multi-seamen-insert/:id",
    component: AddMultiSeamenInsertComponent,
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MultiSeamenInsertRoutingModule { }
