import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './add-item/add-item.component';

const routes: Routes = [
  {
    path: 'add-item',
    component: AddItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
