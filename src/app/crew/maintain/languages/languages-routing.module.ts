import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListLanguagesComponent } from './list-languages/list-languages.component';
import { AddLanguagesComponent } from './add-languages/add-languages.component';
import { ViewLanguagesComponent } from './view-languages/view-languages.component';

const routes: Routes = [
  {
    path:"list-language",
    component:ListLanguagesComponent
  },
  {
    path:"add-language/:id",
    component:AddLanguagesComponent
  },
  {
    path:"view-language/:id",
    component:ViewLanguagesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LanguagesRoutingModule { }
