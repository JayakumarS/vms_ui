import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUomComponent } from './add-uom/add-uom.component';
import { ListUomComponent } from './list-uom/list-uom.component';
import { ViewUomComponent } from './view-uom/view-uom.component';

const routes: Routes = [
  {
    path : 'add-uom/:id',
    component : AddUomComponent
  },
  {
    path : 'list-uom',
    component : ListUomComponent
  },
  {
    path : 'view-uom/:id',
    component : ViewUomComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UomMasterRoutingModule { }
