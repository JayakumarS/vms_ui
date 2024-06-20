import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCurrencyMasterComponent } from './list-currency-master/list-currency-master.component';
import { AddCurrencyMasterComponent } from './add-currency-master/add-currency-master.component';
import { ViewCurrencyMasterComponent } from './view-currency-master/view-currency-master.component';

const routes: Routes = [
  {
    path:'list-currency-master',
    component:ListCurrencyMasterComponent
  },
  {
    path:'add-currency-master/:id',
    component:AddCurrencyMasterComponent
  },
  {
    path:'view-currency-master/:id',
    component:ViewCurrencyMasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrencyMasterRoutingModule { }
