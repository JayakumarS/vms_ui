import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCitiesAirportsComponent } from './list-cities-airports/list-cities-airports.component';
import { AddCitiesAirportsComponent } from './add-cities-airports/add-cities-airports.component';

const routes: Routes = [

  {
    path: "list-cities-airports",
    component: ListCitiesAirportsComponent,
  },
  {
    path: "add-cities-airports/:id",
    component: AddCitiesAirportsComponent,
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitiesAirportsRoutingModule { }
