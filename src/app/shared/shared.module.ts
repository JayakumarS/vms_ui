import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerModule } from "ngx-spinner";

import { MaterialModule } from "./material.module";
import { FeatherIconsModule } from "./components/feather-icons/feather-icons.module";
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { MatSelectModule } from "@angular/material/select";
import { MatOptionModule } from "@angular/material/core";
import { DecimalFormatDirective } from "../directives/decimal-format-directive/decimal-format.directive";
import { NumericFormatDirectiveDirective } from "../directives/numeric-format-directive/numeric-format-directive.directive";
@NgModule({
  declarations: [
    DecimalFormatDirective,
    NumericFormatDirectiveDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    NgxSpinnerModule,
  ],
  exports: [
    DecimalFormatDirective,
    NumericFormatDirectiveDirective,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    NgxSpinnerModule,
    MaterialModule,
    FeatherIconsModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule
  ],
})
export class SharedModule {}
