import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRTFFieldComponent } from './list-rtf-field/list-rtf-field.component';
import { AddRTFFieldComponent } from './add-rtf-field/add-rtf-field.component';

const routes: Routes = [

 
  {
    path: "list-rft-field",
    component: ListRTFFieldComponent,
  },
  {
    path: "add-rft-field/:id",
    component: AddRTFFieldComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RTFFieldRoutingModule { }
