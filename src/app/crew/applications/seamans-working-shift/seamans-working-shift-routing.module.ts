import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSeamansWorkingShiftComponent } from './add-seamans-working-shift/add-seamans-working-shift.component';
import { ListSeamansWorkingShiftComponent } from './list-seamans-working-shift/list-seamans-working-shift.component';

const routes: Routes = [
  {
    path:"add-seamans-working-shift/:id",
    component:AddSeamansWorkingShiftComponent
  },
  {
    path:"list-seamans-working-shift",
    component:ListSeamansWorkingShiftComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeamansWorkingShiftRoutingModule { }
