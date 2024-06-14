import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MultiSeamenInsertRoutingModule } from './multi-seamen-insert-routing.module';
import { AddMultiSeamenInsertComponent } from './add-multi-seamen-insert/add-multi-seamen-insert.component';
import { ListMultiSeamenInsertComponent } from './list-multi-seamen-insert/list-multi-seamen-insert.component';


@NgModule({
  declarations: [
    AddMultiSeamenInsertComponent,
    ListMultiSeamenInsertComponent
  ],
  imports: [
    CommonModule,
    MultiSeamenInsertRoutingModule
  ]
})
export class MultiSeamenInsertModule { }
