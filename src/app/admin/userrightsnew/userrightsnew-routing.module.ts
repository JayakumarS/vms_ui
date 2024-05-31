import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserrightsnewListComponent } from './userrightsnew-list/userrightsnew-list.component';

const routes: Routes = [
  {
    path: "list-userrightsnew",
    component: UserrightsnewListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserrightsnewRoutingModule { }
