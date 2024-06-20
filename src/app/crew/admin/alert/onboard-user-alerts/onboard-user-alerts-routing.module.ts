import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOnboardUserAlertsComponent } from './add-onboard-user-alerts/add-onboard-user-alerts.component';

const routes: Routes = [
  {
    path : 'add-onboard-user-alerts',
    component : AddOnboardUserAlertsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardUserAlertsRoutingModule { }
