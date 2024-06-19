import { NgModule } from '@angular/core';



import { RouterModule, Routes } from '@angular/router';
import { AddCountryMasterComponent } from './add-country-master/add-country-master.component';
import { ListCountryMasterComponent } from './list-country-master/list-country-master.component';
import { ViewCountryMasterComponent } from './view-country-master/view-country-master.component';
const routes: Routes = [
  {
    path: "add-CountryMaster/:id",
    component: AddCountryMasterComponent,
  },
  {
    path: "list-CountryMaster",
    component: ListCountryMasterComponent,
  },
  {
    path: "view-CountryMaster/:id",
    component: ViewCountryMasterComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryMasterRoutingModule { }
