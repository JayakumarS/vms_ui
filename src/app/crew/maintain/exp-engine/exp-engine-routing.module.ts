import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListExpEngineComponent } from './list-exp-engine/list-exp-engine.component';
import { AddExpEngineComponent } from './add-exp-engine/add-exp-engine.component';
import { ViewExpEngineComponent } from './view-exp-engine/view-exp-engine.component';

const routes: Routes = [
  {
    path:"list-exp-engine",
    component:ListExpEngineComponent
  },
  {
    path:"add-exp-engine/:id",
    component:AddExpEngineComponent
  },
  {
    path:"view-exp-engine/:id",
    component:ViewExpEngineComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpEngineRoutingModule { }
