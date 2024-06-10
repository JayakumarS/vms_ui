import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRequisitionComponent } from './list-requisition/list-requisition.component';
import { AddRequisitionComponent } from './add-requisition/add-requisition.component';

const routes: Routes = [
  {
    path:'list-requisition',
    component: ListRequisitionComponent
  },
  {
    path:'add-requisition',
    component: AddRequisitionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequisitionRoutingModule { }
