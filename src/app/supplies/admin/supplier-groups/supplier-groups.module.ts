import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierGroupsRoutingModule } from './supplier-groups-routing.module';
import { AddSupplierGroupsComponent } from './add-supplier-groups/add-supplier-groups.component';
import { ListSupplierGroupsComponent } from './list-supplier-groups/list-supplier-groups.component';


@NgModule({
  declarations: [
    AddSupplierGroupsComponent,
    ListSupplierGroupsComponent
  ],
  imports: [
    CommonModule,
    SupplierGroupsRoutingModule
  ]
})
export class SupplierGroupsModule { }
