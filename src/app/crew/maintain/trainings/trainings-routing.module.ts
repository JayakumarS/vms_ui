import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTrainingsComponent } from './list-trainings/list-trainings.component';
import { AddTrainingsComponent } from './add-trainings/add-trainings.component';
import { ViewTrainingsComponent } from './view-trainings/view-trainings.component';

const routes: Routes = [
  {
    path:"list-trainings",
    component:ListTrainingsComponent
  },
  {
    path:"add-trainings/:id",
    component:AddTrainingsComponent
  },
  {
    path:"view-trainings/:id",
    component:ViewTrainingsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingsRoutingModule { }
