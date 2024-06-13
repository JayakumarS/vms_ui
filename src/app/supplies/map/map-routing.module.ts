import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMapComponent } from './add-map/add-map.component';

const routes: Routes = [
  {
    path: 'add-map',
    component: AddMapComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule { }
