import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPayTypesComponent } from './list-pay-types/list-pay-types.component';
import { AddPayTypesComponent } from './add-pay-types/add-pay-types.component';

const routes: Routes = [

  {
    path: "list-pay-types",
    component: ListPayTypesComponent,
  },
  {
    path: "add-pay-types/:id",
    component: AddPayTypesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayTypesRoutingModule { }
