import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOffSignComponent } from './add-off-sign/add-off-sign.component';
import { ListOffSignComponent } from './list-off-sign/list-off-sign.component';

const routes: Routes = [
  {
    path: "add-off-sign/:id",
    component: AddOffSignComponent,
  },
  {
    path: "list-off-sign",
    component: ListOffSignComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffSignRoutingModule { }
