import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandedGoodsControlPanelComponent } from './landed-goods-control-panel/landed-goods-control-panel.component';

const routes: Routes = [
  {
    path:"addlandgoodspanel",
    component:LandedGoodsControlPanelComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandedgoodsControlpanelRoutingModule { }
