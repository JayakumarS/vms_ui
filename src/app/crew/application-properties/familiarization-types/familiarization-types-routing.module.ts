import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFamiliarizationTypesComponent } from './add-familiarization-types/add-familiarization-types.component';

const routes: Routes = [
  {
    path :'add-familiarization-type',
    component: AddFamiliarizationTypesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamiliarizationTypesRoutingModule { }
