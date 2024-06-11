import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplyDashboardComponent } from './supply-dashboard/supply-dashboard.component';

const routes: Routes = [
  
  {
    path: "supply-dashboard",
    component: SupplyDashboardComponent,
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplyDashboardRoutingModule { }
