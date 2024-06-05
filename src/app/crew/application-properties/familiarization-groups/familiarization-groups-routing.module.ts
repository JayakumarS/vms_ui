import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFamiliarizationGroupsComponent } from './add-familiarization-groups/add-familiarization-groups.component';
import { ListFamiliarizationGroupsComponent } from './list-familiarization-groups/list-familiarization-groups.component';

const routes: Routes = [
  {
    path: 'add-familiarization-groups/:0',
    component: AddFamiliarizationGroupsComponent
  },
  {
    path: 'list-familiarization-groups',
    component: ListFamiliarizationGroupsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamiliarizationGroupsRoutingModule { }
