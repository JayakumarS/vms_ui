import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEngineTypesComponent } from './add-engine-types/add-engine-types.component';
import { ListEngineTypesComponent } from './list-engine-types/list-engine-types.component';

const routes: Routes = [
  {
    path: 'add-engine-types/:0',
    component:AddEngineTypesComponent
  },
  {
    path: 'list-engine-types',
    component:ListEngineTypesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EngineTypesRoutingModule { }
