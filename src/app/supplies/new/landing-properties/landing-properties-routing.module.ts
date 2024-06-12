import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListLandingPropertiesComponent } from './list-landing-properties/list-landing-properties.component';
import { AddLandingPropertiesComponent } from './add-landing-properties/add-landing-properties.component';

const routes: Routes = [
  {
    path:'list-landing-properties',
    component: ListLandingPropertiesComponent
  },
  {
    path:'add-landing-properties/:id',
    component: AddLandingPropertiesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPropertiesRoutingModule { }
