import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UdeListComponent } from './ude-list/ude-list.component';

const routes: Routes = [  {
  path: "list",
  component: UdeListComponent,
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UdeListRoutingModule { }
