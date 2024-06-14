import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUtilitiesComponent } from './add-utilities/add-utilities.component';
import { UserLogComponent } from './user-log/user-log.component';
import { CopySystemsComponent } from './copy-systems/copy-systems.component';
import { CopySubsystemsComponent } from './copy-subsystems/copy-subsystems.component';
import { CopyVesselbudgetsComponent } from './copy-vesselbudgets/copy-vesselbudgets.component';

const routes: Routes = [
  {
    path: 'add-utilities',
    component: AddUtilitiesComponent
  },
  {
    path: 'user-log',
    component: UserLogComponent
  },
  {
    path:'copy-systems',
    component: CopySystemsComponent
  },
  {
    path:'copy-subsystems',
    component: CopySubsystemsComponent
  },
  {
    path:'copy-vesselbudgets',
    component:CopyVesselbudgetsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilitiesRoutingModule { }
