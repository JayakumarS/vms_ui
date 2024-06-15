import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMultiSeamenSignOffComponent } from './list-multi-seamen-sign-off/list-multi-seamen-sign-off.component';

const routes: Routes = [
  {
    path:'list-multi-seamen-sign-off',
    component:ListMultiSeamenSignOffComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MultiSeamenSignOffRoutingModule { }
