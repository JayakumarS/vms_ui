import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVesselParticularsComponent } from './add-vessel-particulars/add-vessel-particulars.component';
import { ListVesselParticularsComponent } from './list-vessel-particulars/list-vessel-particulars.component';

const routes: Routes = [
  {
    path: "add-vessel-particulars/:id",
    component: AddVesselParticularsComponent,
  },
  {
    path: "list-vessel-particulars",
    component: ListVesselParticularsComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VesselParticularsRoutingModule { }
