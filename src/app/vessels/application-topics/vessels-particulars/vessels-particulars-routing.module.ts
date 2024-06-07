import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVesselsParticularsComponent } from './add-vessels-particulars/add-vessels-particulars.component';
import { ListVesselsParticularsComponent } from './list-vessels-particulars/list-vessels-particulars.component';

const routes: Routes = [
  {
    path: "add-vessel-particulars/:id",
    component: AddVesselsParticularsComponent,
  },
  {
    path: "list-vessel-particulars",
    component: ListVesselsParticularsComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VesselsParticularsRoutingModule { }
