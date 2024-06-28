import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMultiSeamenInsertComponent } from '../../utilities/multi-seamen-insert/add-multi-seamen-insert/add-multi-seamen-insert.component';
import { AddMultiSeamenSignOffComponent } from './add-multi-seamen-sign-off/add-multi-seamen-sign-off.component';

const routes: Routes = [

  {
    path: 'add-multi-seamen-sign-off',
    component: AddMultiSeamenSignOffComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MultiSeamenSignOffRoutingModule { }
