import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFamiliarizationItemsComponent } from './add-familiarization-items/add-familiarization-items.component';
import { ListFamiliarizationItemsComponent } from './list-familiarization-items/list-familiarization-items.component';

const routes: Routes = [
  {
    path :'add-familiarization-items/:0',
    component: AddFamiliarizationItemsComponent
  },
  {
    path :'list-familiarization-items',
    component: ListFamiliarizationItemsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamiliarizationItemsRoutingModule { }
