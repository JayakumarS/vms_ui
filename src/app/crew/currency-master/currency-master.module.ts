import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableExporterModule } from 'mat-table-exporter';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CurrencyMasterRoutingModule } from './currency-master-routing.module';
import { AddCurrencyMasterComponent } from './add-currency-master/add-currency-master.component';
import { ListCurrencyMasterComponent } from './list-currency-master/list-currency-master.component';
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
import { VesselTypesRoutingModule } from 'src/app/vessels/maintain/vessel-types/vessel-types-routing.module';
import { ViewCurrencyMasterComponent } from './view-currency-master/view-currency-master.component';


@NgModule({
  declarations: [
    AddCurrencyMasterComponent,
    ListCurrencyMasterComponent,
    ViewCurrencyMasterComponent,
  ],
  imports: [
    CommonModule,
    CurrencyMasterRoutingModule,
    CommonModule,
    VesselTypesRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
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
export class CurrencyMasterModule { }
