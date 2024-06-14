import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddECommerceSuppliersReferenceComponent } from './add-e-commerce-suppliers-reference/add-e-commerce-suppliers-reference.component';
import { ListECommerceSuppliersReferenceComponent } from './list-e-commerce-suppliers-reference/list-e-commerce-suppliers-reference.component';

const routes: Routes = [

  {
    path: "list-e-commerce-suppliers-reference",
    component: ListECommerceSuppliersReferenceComponent,
  },
  {
    path: "add-e-commerce-suppliers-reference/:id",
    component: AddECommerceSuppliersReferenceComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ECommerceSuppliersReferenceRoutingModule { }
