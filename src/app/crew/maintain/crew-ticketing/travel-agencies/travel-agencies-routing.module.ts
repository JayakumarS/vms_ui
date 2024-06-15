import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTravelAgenciesComponent } from './list-travel-agencies/list-travel-agencies.component';
import { AddTravelAgenciesComponent } from './add-travel-agencies/add-travel-agencies.component';

const routes: Routes = [

  {
    path: "list-travel-agencies",
    component: ListTravelAgenciesComponent,
  },
  {
    path: "add-travel-agencies/:id",
    component: AddTravelAgenciesComponent,
  }





];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TravelAgenciesRoutingModule { }
