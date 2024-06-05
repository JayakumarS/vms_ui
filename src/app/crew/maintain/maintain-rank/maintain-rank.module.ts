import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintainRankRoutingModule } from './maintain-rank-routing.module';
import { AddMaintainRankComponent } from './add-maintain-rank/add-maintain-rank.component';
import { NotificationService } from 'src/app/core/service/notification.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";
import { MatMenuModule } from "@angular/material/menu";
import { MatSortModule } from "@angular/material/sort";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTableExporterModule } from "mat-table-exporter";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { SharedModule } from "src/app/shared/shared.module";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ListMaintainRankComponent } from './list-maintain-rank/list-maintain-rank.component';
import { A11yModule } from '@angular/cdk/a11y';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTableModule } from '@angular/cdk/table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgxPaginationModule } from 'ngx-pagination';
import { CountryMasterRoutingModule } from 'src/app/master/country-master/country-master-routing.module';


@NgModule({
  declarations: [
    ListMaintainRankComponent,
    AddMaintainRankComponent
  ],
  providers: [
    NotificationService
  ],
  imports: [
    CommonModule,
    MaintainRankRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    // MatDialogModule,
    MatSortModule,
    MatMenuModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTabsModule,
    MatCheckboxModule,
    MatTableExporterModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    ComponentsModule,
    SharedModule,
    MatAutocompleteModule,
    MatDialogModule, CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    // MatDialogModule,
    MatSortModule,
    MatMenuModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTabsModule,
    MatCheckboxModule,
    MatTableExporterModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    ComponentsModule,
    SharedModule,
    MatAutocompleteModule,
    MatDialogModule,
     CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MatTableModule,
      MatPaginatorModule,
      MatFormFieldModule,
      MatInputModule,
      MatSnackBarModule,
      MatButtonModule,
      MatIconModule,
      MatDialogModule,
      MatSortModule,
      MatMenuModule,
      MatToolbarModule,
      MatSelectModule,
      MatDatepickerModule,
      MatTabsModule,
      MatCheckboxModule,
      MatTableExporterModule,
      MatTooltipModule,
      MatProgressSpinnerModule,
      ComponentsModule,
      SharedModule,
      FormsModule,
      ReactiveFormsModule,
      MatTableModule,
      MatPaginatorModule,
      MatFormFieldModule,
      MatInputModule,
      MatSnackBarModule,
      MatButtonModule,
      MatIconModule,
      MatDialogModule,
      MatSortModule,
      MatMenuModule,
      MatToolbarModule,
      MatSelectModule,
      MatDatepickerModule,
      MatTabsModule,
      MatTableExporterModule,
      MatTooltipModule,
      MatProgressSpinnerModule,
      ComponentsModule,
      SharedModule,
      CountryMasterRoutingModule,
      MatAutocompleteModule,
      ReactiveFormsModule,
      MatTableModule,
      MatPaginatorModule,
      MatFormFieldModule,
      MatInputModule,
      ScrollingModule,
      MatSnackBarModule,
      MatButtonModule,
      MatIconModule,
      MatDialogModule,
      MatSortModule,
      MatMenuModule,
      MatToolbarModule,
      MatSelectModule,
      MatDatepickerModule,
      MatTabsModule,
      MatTableExporterModule,
      MatTooltipModule,
      MatProgressSpinnerModule,
      ComponentsModule,
      SharedModule,
      MatRadioModule,
      NgxMatSelectSearchModule,
      MatAutocompleteModule,
      A11yModule,
      CdkTableModule,
      MatAutocompleteModule,
      MatButtonModule,
      MatButtonToggleModule,
      MatCheckboxModule,
      MatDatepickerModule,
      MatDialogModule,
      MatDividerModule,
      MatExpansionModule,
      MatIconModule,
      MatInputModule,
      MatListModule,
      MatMenuModule,
      MatNativeDateModule,
      MatPaginatorModule,
      MatProgressBarModule,
      MatProgressSpinnerModule,
      MatRadioModule,
      MatRippleModule,
      MatSelectModule,
      MatSlideToggleModule,
      MatSnackBarModule,
      MatSortModule,
      MatTableModule,
      MatTabsModule,
      MatToolbarModule,
      MatTooltipModule,
      PortalModule,
      ScrollingModule,
      NgxMatSelectSearchModule,
      NgxPaginationModule,
      MatPaginatorModule,
      MatAutocompleteModule
  ]
})
export class MaintainRankModule { 

}
