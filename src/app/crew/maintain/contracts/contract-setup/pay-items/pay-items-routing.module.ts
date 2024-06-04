import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPayItemsComponent } from './list-pay-items/list-pay-items.component';
import { AddPayItemsComponent } from './add-pay-items/add-pay-items.component';

const routes: Routes = [
  
  {
    path: "list-pay-items",
    component: ListPayItemsComponent,
  },
  {
    path: "add-pay-items/:id",
    component: AddPayItemsComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayItemsRoutingModule { }
