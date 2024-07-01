import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListStorageLocationComponent } from './list-storage-location/list-storage-location.component';
import { AddStorageLocationComponent } from './add-storage-location/add-storage-location.component';
import { ViewStorageLocationComponent } from './view-storage-location/view-storage-location.component';

const routes: Routes = [
  {
    path:"list-storage-location",
    component:ListStorageLocationComponent
  },
  {
    path:"add-storage-location/:id",
    component:AddStorageLocationComponent
  },
  {
    path:"view-storage-location/:id",
    component:ViewStorageLocationComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StorageLocationRoutingModule { }
