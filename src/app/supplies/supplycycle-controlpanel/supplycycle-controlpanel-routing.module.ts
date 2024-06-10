import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSupplycycleControlpanelComponent } from './add-supplycycle-controlpanel/add-supplycycle-controlpanel.component';

const routes: Routes = [
  {
    path:"addsupply-cyclepanel",
    component:AddSupplycycleControlpanelComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplycycleControlpanelRoutingModule { }
