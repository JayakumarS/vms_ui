import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCrewPromotionComponent } from './add-crew-promotion/add-crew-promotion.component';
import { ListCrewPromotionComponent } from './list-crew-promotion/list-crew-promotion.component';

const routes: Routes = [
  {
    path: 'add-crew-promotion/:0',
    component: AddCrewPromotionComponent
  },
  {
    path: 'list-crew-promotion',
    component: ListCrewPromotionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrewPromotionRoutingModule { }
