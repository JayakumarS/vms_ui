import { NgModule } from "@angular/core";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { SharedModule } from "../shared.module";
import { SearchableSelectComponent } from './searchable-select/searchable-select.component';
import { WarningPopupComponent } from './warning-popup/warning-popup.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MultiValueComponent } from './multi-value/multi-value.component';

@NgModule({
  declarations: [FileUploadComponent, BreadcrumbComponent, SearchableSelectComponent, WarningPopupComponent,WarningPopupComponent, MultiValueComponent],
  imports: [
    SharedModule,
    MatDialogModule
  ],
  exports: [FileUploadComponent, BreadcrumbComponent, SearchableSelectComponent,MultiValueComponent],
})
export class ComponentsModule {}
