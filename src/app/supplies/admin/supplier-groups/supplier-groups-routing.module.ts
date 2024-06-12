import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSupplierGroupsComponent } from './add-supplier-groups/add-supplier-groups.component';
import { ListSupplierGroupsComponent } from './list-supplier-groups/list-supplier-groups.component';

const routes: Routes = [

  {
    path: "add-supplier-groups/:id",
    component: AddSupplierGroupsComponent,
  },
  {
    path: "list-supplier-groups",
    component: ListSupplierGroupsComponent,
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierGroupsRoutingModule { }
