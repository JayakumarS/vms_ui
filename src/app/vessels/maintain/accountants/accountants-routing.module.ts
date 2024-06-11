import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAccountantsComponent } from './list-accountants/list-accountants.component';
import { AddAccountantsComponent } from './add-accountants/add-accountants.component';

const routes: Routes = [
  {
    path:"list-accountants",
    component:ListAccountantsComponent
  },
  {
    path:"add-accountants/:id",
    component:AddAccountantsComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountantsRoutingModule { }
