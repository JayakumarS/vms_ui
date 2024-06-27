import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMedicalsComponent } from './list-medicals/list-medicals.component';
import { AddMedicalsComponent } from './add-medicals/add-medicals.component';

const routes: Routes = [
  {
    path:"list-Medicals",
    component:ListMedicalsComponent
  },
  {
    path:"add-Medicals/:id",
    component:AddMedicalsComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalsRoutingModule { }
