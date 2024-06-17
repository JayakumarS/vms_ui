import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUpdateVoyageComponent } from './list-update-voyage/list-update-voyage.component';

const routes: Routes = [
  {
    path:'list-update-voyage',
    component:ListUpdateVoyageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateVoyageRoutingModule { }
