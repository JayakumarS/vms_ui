import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewPayTypesComponent } from './view-pay-types/view-pay-types.component';
import { ListPayTypesComponent } from './list-pay-types/list-pay-types.component';
import { AddPayTypesComponent } from './add-pay-types/add-pay-types.component';

const routes: Routes = [
  {
    path:"list-paytypes",
    component:ListPayTypesComponent
  },
  {
    path:"add-paytypes/:id",
    component:AddPayTypesComponent
  },
  {
    path:"view-paytypes/:id",
    component:ViewPayTypesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayTypesRoutingModule { }
