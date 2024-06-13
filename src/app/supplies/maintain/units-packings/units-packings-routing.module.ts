import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUnitsPackingsComponent } from './add-units-packings/add-units-packings.component';
import { ListUnitsPackingsComponent } from './list-units-packings/list-units-packings.component';

const routes: Routes = [

  {
    path: "list-units-packings",
    component: ListUnitsPackingsComponent,
  },
  {
    path: "add-units-packings/:id",
    component: AddUnitsPackingsComponent,
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitsPackingsRoutingModule { }
