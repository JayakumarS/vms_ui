import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  declarations: [],
  imports: [CommonModule, AdminRoutingModule,AgGridModule],
})
export class AdminModule {}
