import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCrewFamiliarizationComponent } from './add-crew-familiarization/add-crew-familiarization.component';
import { ListCrewFamiliarizationComponent } from './list-crew-familiarization/list-crew-familiarization.component';

const routes: Routes = [
  {
    path: 'add-crew-familiarization',
    component: AddCrewFamiliarizationComponent
  },
  {
    path: 'list-crew-familiarization',
    component: ListCrewFamiliarizationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrewFamiliarizationRoutingModule { }
