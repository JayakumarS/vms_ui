import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditLogRoutingModule } from './audit-log-routing.module';
import { AuditLogListComponent } from './audit-log-list/audit-log-list.component';
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
import { EncrDecrService } from 'src/app/core/service/encrDecr.Service';
import { EncryptionService } from 'src/app/core/service/encrypt.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { ViewAuditLogComponent } from './view-audit-log/view-audit-log.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonService } from 'src/app/common-service/common.service';

@NgModule({
  declarations: [
    AuditLogListComponent,
    ViewAuditLogComponent
  ],
  providers: [
    NotificationService,
    EncrDecrService,
    EncryptionService,
    CommonService
  ],
  imports: [
    CommonModule,
    AuditLogRoutingModule,
    
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
    NgxJsonViewerModule,
    MatAutocompleteModule

  ]
})
export class AuditLogModule { }
