import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListClassificationComponent } from './list-classification/list-classification.component';
import { AddClassificationComponent } from './add-classification/add-classification.component';

const routes: Routes = [
  {
    path:"list-classification",
    component:ListClassificationComponent
  },
  {
    path:"add-classification/:id",
    component:AddClassificationComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassificationRoutingModule { }
