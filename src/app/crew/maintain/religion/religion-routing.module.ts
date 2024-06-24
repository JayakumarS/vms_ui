import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListReligionComponent } from './list-religion/list-religion.component';
import { AddReligionComponent } from './add-religion/add-religion.component';
import { ViewReligionComponent } from './view-religion/view-religion.component';

const routes: Routes = [
  {
    path: "list-religion",
    component: ListReligionComponent,
  },
  {
    path: "add-religion/:id",
    component: AddReligionComponent,
  },
  {
    path:"view-religion/:id",
    component:ViewReligionComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReligionRoutingModule { }
