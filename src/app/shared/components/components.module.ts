import { NgModule } from "@angular/core";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { SharedModule } from "../shared.module";
import { SearchableSelectComponent } from './searchable-select/searchable-select.component';

@NgModule({
  declarations: [FileUploadComponent, BreadcrumbComponent, SearchableSelectComponent],
  imports: [
    SharedModule,
  ],
  exports: [FileUploadComponent, BreadcrumbComponent, SearchableSelectComponent],
})
export class ComponentsModule {}
