import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListVesselsDetailsComponent } from './list-vessels-details/list-vessels-details.component';

const routes: Routes = [
  {
    path:"list-vessels-details",
    component:ListVesselsDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VesselsDetailsRoutingModule { }
