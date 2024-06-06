import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDefineOfficersQualificationMatchingComponent } from './list-define-officers-qualification-matching/list-define-officers-qualification-matching.component';
import { AddDefineOfficersQualificationMatchingComponent } from './add-define-officers-qualification-matching/add-define-officers-qualification-matching.component';

const routes: Routes = [

  
  {
    path: "list-Qualification-Matching",
    component: ListDefineOfficersQualificationMatchingComponent,
  },
  {
    path: "add-Qualification-Matching/:id",
    component: AddDefineOfficersQualificationMatchingComponent,
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefineOfficersQualificationMatchingRoutingModule { }
