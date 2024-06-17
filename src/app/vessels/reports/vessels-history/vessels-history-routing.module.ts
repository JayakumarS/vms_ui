import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VesselsHistoryComponent } from './vessels-history/vessels-history.component';

const routes: Routes = [
  {
    path: 'vessels-history',
    component: VesselsHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VesselsHistoryRoutingModule { }
