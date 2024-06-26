import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListWageScalesComponent } from './list-wage-scales/list-wage-scales.component';
import { AddVesselTypesComponent } from '../vessel-types/add-vessel-types/add-vessel-types.component';
import { AddWageScalesComponent } from './add-wage-scales/add-wage-scales.component';
import { ViewWageScalesComponent } from './view-wage-scales/view-wage-scales.component';

const routes: Routes = [
  {
    path:"list-wageScale",
    component:ListWageScalesComponent
  },
  {
    path:"add-wageScale/:id",
    component:AddWageScalesComponent
  },
  {
    path:"view-wageScale/:id",
    component:ViewWageScalesComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WageScalesRoutingModule { }
