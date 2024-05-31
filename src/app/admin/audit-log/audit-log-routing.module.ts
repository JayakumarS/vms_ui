import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditLogListComponent } from './audit-log-list/audit-log-list.component';
import { ViewAuditLogComponent } from './view-audit-log/view-audit-log.component';

const routes: Routes = [

  {
    path: "list-audit-log",
    component: AuditLogListComponent,
  },

  {
    path: "view-audit-log/:id",
    component: ViewAuditLogComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditLogRoutingModule { }
