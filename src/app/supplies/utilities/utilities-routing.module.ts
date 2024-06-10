import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUtilitiesComponent } from './add-utilities/add-utilities.component';
import { UserLogComponent } from './user-log/user-log.component';

const routes: Routes = [
  {
    path: 'add-utilities',
    component: AddUtilitiesComponent
  },
  {
    path: 'user-log',
    component: UserLogComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilitiesRoutingModule { }
