import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFreightTypeComponent } from './list-freight-type/list-freight-type.component';
import { AddFreightTypeComponent } from './add-freight-type/add-freight-type.component';
import { ViewFreightTypeComponent } from './view-freight-type/view-freight-type.component';

const routes: Routes = [
  {
    path:"list-freight-type",
    component:ListFreightTypeComponent
  },
  {
    path:"add-freight-type/:id",
    component:AddFreightTypeComponent
  },
  {
    path:"view-freight-type/:id",
    component:ViewFreightTypeComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreightTypeRoutingModule { }
