import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFamiliarizationTypesComponent } from './add-familiarization-types/add-familiarization-types.component';
import { ListFamiliarizationTypesComponent } from './list-familiarization-types/list-familiarization-types.component';

const routes: Routes = [
  {
    path :'add-familiarization-type/:0',
    component: AddFamiliarizationTypesComponent
  },
  {
    path :'list-familiarization-type',
    component: ListFamiliarizationTypesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamiliarizationTypesRoutingModule { }
