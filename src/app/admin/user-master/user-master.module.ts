import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserMasterRoutingModule } from './user-master-routing.module';
import { AddUserMasterComponent } from './add-user-master/add-user-master.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatTableExporterModule } from 'mat-table-exporter';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListUserMasterComponent } from './list-user-master/list-user-master.component';
import { DeleteUserMasterComponent } from './list-user-master/delete-user-master/delete-user-master.component';
import { UserMessagePopUpComponent } from './list-user-master/user-message-pop-up/user-message-pop-up.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import { ListUserMasterComponent } from './list-user-master/list-user-master.component';


@NgModule({
  declarations: [
    AddUserMasterComponent,
    ListUserMasterComponent,
    DeleteUserMasterComponent,
    UserMessagePopUpComponent,
    // ListUserMasterComponent
  ],
  imports: [
    CommonModule,
    UserMasterRoutingModule,
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
    MatAutocompleteModule
  ]
})
export class UserMasterModule { 
  
}
